import type { Request, Response } from 'express';
import { IntegrationService } from '../services/IntegrationService.js';
import { getStringParam } from '../utils/helpers.js';

export class IntegrationController {
    private integrationService = new IntegrationService();

    async connectIntegration(req: Request, res: Response): Promise<void> {
        try {
            const { userId, provider, token } = req.body;
            await this.integrationService.connectIntegration(userId, provider, token);
            res.json({ success: true, message: `${provider} connected` });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async disconnectIntegration(req: Request, res: Response): Promise<void> {
        try {
            const { userId, provider } = req.body;
            await this.integrationService.disconnectIntegration(userId, provider);
            res.json({ success: true, message: `${provider} disconnected` });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getIntegrations(req: Request, res: Response): Promise<void> {
        try {
            const userId = getStringParam(req.params.userId);
            if (!userId) {
                res.status(400).json({ error: 'User ID is required' });
                return;
            }
            const integrations = await this.integrationService.getIntegrations(userId);
            res.json({ success: true, data: integrations });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
