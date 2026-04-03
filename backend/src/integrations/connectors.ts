export interface Connector {
    connect(): Promise<void>;
    sync(): Promise<void>;
    disconnect(): Promise<void>;
}

export class SlackConnector implements Connector {
    private token: string;

    constructor(token: string) {
        this.token = token;
    }

    async connect(): Promise<void> {
        console.log('[Slack] Connecting...');
    }

    async sync(): Promise<void> {
        console.log('[Slack] Syncing data...');
    }

    async disconnect(): Promise<void> {
        console.log('[Slack] Disconnecting...');
    }
}

export class OutlookConnector implements Connector {
    private token: string;

    constructor(token: string) {
        this.token = token;
    }

    async connect(): Promise<void> {
        console.log('[Outlook] Connecting...');
    }

    async sync(): Promise<void> {
        console.log('[Outlook] Syncing data...');
    }

    async disconnect(): Promise<void> {
        console.log('[Outlook] Disconnecting...');
    }
}
