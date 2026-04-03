export interface Channel {
    send(message: string, recipient: string): Promise<void>;
}

export class EmailChannel implements Channel {
    async send(message: string, recipient: string): Promise<void> {
        console.log(`[Email] Sending to ${recipient}: ${message}`);
        // In production, integrate with email service (SendGrid, AWS SES, etc.)
        // Example:
        // await emailService.send({
        //   to: recipient,
        //   subject: 'NexaProductivity Reminder',
        //   body: message
        // });
    }
}

export class Notifier {
    private channel: Channel;

    constructor(channel: Channel) {
        this.channel = channel;
    }

    setChannel(channel: Channel): void {
        this.channel = channel;
    }

    async notify(message: string, recipient: string): Promise<void> {
        await this.channel.send(message, recipient);
    }
}
