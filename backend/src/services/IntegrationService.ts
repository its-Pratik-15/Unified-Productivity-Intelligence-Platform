import { SlackConnector, OutlookConnector } from '../integrations/connectors.js';
import type { Connector } from '../integrations/connectors.js';
import { Database } from '../core/Database.js';

export class IntegrationService {
    private db = Database.getInstance();
    private connectors: Map<string, Connector> = new Map();

    async connectIntegration(
        userId: string,
        provider: 'slack' | 'outlook',
        token: string
    ): Promise<void> {
        let connector: Connector;

        switch (provider) {
            case 'slack':
                connector = new SlackConnector(token);
                break;
            case 'outlook':
                connector = new OutlookConnector(token);
                break;
            default:
                throw new Error(`Unknown provider: ${provider}`);
        }

        await connector.connect();
        await connector.sync();

        const prisma = this.db.getPrisma();
        await prisma.integration.create({
            data: {
                userId,
                provider,
                status: 'connected',
                configJson: JSON.stringify({ token }),
            },
        });

        this.connectors.set(`${userId}-${provider}`, connector);
    }

    async disconnectIntegration(userId: string, provider: string): Promise<void> {
        const key = `${userId}-${provider}`;
        const connector = this.connectors.get(key);

        if (connector) {
            await connector.disconnect();
            this.connectors.delete(key);
        }

        const prisma = this.db.getPrisma();
        await prisma.integration.updateMany({
            where: { userId, provider },
            data: { status: 'disconnected' },
        });
    }

    async getIntegrations(userId: string) {
        const prisma = this.db.getPrisma();
        return prisma.integration.findMany({
            where: { userId },
        });
    }
}
