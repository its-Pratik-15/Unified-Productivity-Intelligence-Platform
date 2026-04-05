import { EmailChannel, Notifier } from '../notifications/channels.js';
import { Database } from '../core/Database.js';

export class NotificationService {
    private notifier: Notifier;
    private db = Database.getInstance();

    constructor() {
        this.notifier = new Notifier(new EmailChannel());
    }

    async createReminder(
        userId: string,
        type: 'task' | 'custom',
        title: string,
        date: Date,
        time: string,
        notifyBefore: string,
        email: string,
        subject?: string
    ): Promise<any> {
        return await this.db.prisma.notification.create({
            data: {
                userId,
                type,
                title,
                subject: subject || null,
                date,
                time,
                notifyBefore,
                email,
                status: 'active',
            },
        });
    }

    async getReminders(userId: string): Promise<any[]> {
        return await this.db.prisma.notification.findMany({
            where: { userId },
            orderBy: { date: 'asc' },
        });
    }

    async deleteReminder(reminderId: string): Promise<void> {
        await this.db.prisma.notification.delete({
            where: { id: reminderId },
        });
    }

    async sendReminderEmail(
        email: string,
        title: string,
        date: Date,
        time: string
    ): Promise<void> {
        const message = `Reminder: ${title} is scheduled for ${date.toLocaleDateString()} at ${time}`;
        await this.notifier.notify(message, email);
    }

    // Check for reminders that need to be sent
    async processReminders(): Promise<void> {
        const now = new Date();
        const reminders = await this.db.prisma.notification.findMany({
            where: {
                status: 'active',
            },
        });

        for (const reminder of reminders) {
            const reminderDate = new Date(reminder.date);
            const notifyTime = this.calculateNotifyTime(
                reminderDate,
                reminder.time,
                reminder.notifyBefore
            );

            if (now >= notifyTime && now < reminderDate) {
                await this.sendReminderEmail(
                    reminder.email,
                    reminder.title,
                    reminderDate,
                    reminder.time
                );

                // Update status to sent
                await this.db.prisma.notification.update({
                    where: { id: reminder.id },
                    data: { status: 'sent' },
                });
            }
        }
    }

    private calculateNotifyTime(
        date: Date,
        time: string,
        notifyBefore: string
    ): Date {
        const timeParts = time.split(':');
        const hours = parseInt(timeParts[0] || '0');
        const minutes = parseInt(timeParts[1] || '0');
        const eventTime = new Date(date);
        eventTime.setHours(hours, minutes, 0, 0);

        // Parse notifyBefore (e.g., "1 day", "2 hours", "30 minutes")
        const match = notifyBefore.match(/(\d+)\s+(minute|hour|day|week)s?/);
        if (!match) return eventTime;

        const amount = match[1];
        const unit = match[2];
        const value = parseInt(amount || '0');

        const notifyTime = new Date(eventTime);
        switch (unit) {
            case 'minute':
                notifyTime.setMinutes(notifyTime.getMinutes() - value);
                break;
            case 'hour':
                notifyTime.setHours(notifyTime.getHours() - value);
                break;
            case 'day':
                notifyTime.setDate(notifyTime.getDate() - value);
                break;
            case 'week':
                notifyTime.setDate(notifyTime.getDate() - value * 7);
                break;
        }

        return notifyTime;
    }
}
