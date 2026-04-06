import type { Request, Response } from 'express';
import { DashboardService } from '../services/DashboardService.js';
import { getStringParam } from '../utils/helpers.js';

export class DashboardController {
    private dashboardService = new DashboardService();

    async getDashboardData(req: Request, res: Response): Promise<void> {
        try {
            const userId = getStringParam(req.params.userId);
            if (!userId) {
                res.status(400).json({ error: 'User ID is required' });
                return;
            }
            const data = await this.dashboardService.getDashboardData(userId);
            res.json({ success: true, data });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
