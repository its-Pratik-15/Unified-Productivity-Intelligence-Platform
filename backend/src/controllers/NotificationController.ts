import type { Request, Response } from 'express';
import { NotificationService } from '../services/NotificationService.js';
import { getStringParam } from '../utils/helpers.js';

export class NotificationController {
    private notificationService = new NotificationService();

    async createReminder(req: Request, res: Response): Promise<void> {
        try {
            const { userId, type, title, date, time, notifyBefore, email, subject } = req.body;
            const reminder = await this.notificationService.createReminder(
                userId,
                type,
                title,
                new Date(date),
                time,
                notifyBefore,
                email,
                subject
            );
            res.json({ success: true, data: reminder });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getReminders(req: Request, res: Response): Promise<void> {
        try {
            const userId = getStringParam(req.params.userId);
            if (!userId) {
                res.status(400).json({ error: 'User ID is required' });
                return;
            }
            const reminders = await this.notificationService.getReminders(userId);
            res.json({ success: true, data: reminders });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteReminder(req: Request, res: Response): Promise<void> {
        try {
            const reminderId = getStringParam(req.params.reminderId);
            if (!reminderId) {
                res.status(400).json({ error: 'Reminder ID is required' });
                return;
            }
            await this.notificationService.deleteReminder(reminderId);
            res.json({ success: true, message: 'Reminder deleted' });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async sendReminderEmail(req: Request, res: Response): Promise<void> {
        try {
            const { email, title, date, time } = req.body;
            await this.notificationService.sendReminderEmail(
                email,
                title,
                new Date(date),
                time
            );
            res.json({ success: true, message: 'Reminder email sent' });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
