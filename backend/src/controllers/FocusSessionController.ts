import type { Request, Response } from 'express';
import { FocusSessionService } from '../services/FocusSessionService.js';
import { getStringParam, getNumberParam } from '../utils/helpers.js';

export class FocusSessionController {
    private focusSessionService = new FocusSessionService();

    async createSession(req: Request, res: Response): Promise<void> {
        try {
            const { userId, subject, duration, phase, startedAt, endedAt } = req.body;
            const session = await this.focusSessionService.createSession(
                userId,
                subject,
                duration,
                phase,
                new Date(startedAt),
                new Date(endedAt)
            );
            res.json({ success: true, data: session });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getUserSessions(req: Request, res: Response): Promise<void> {
        try {
            const userId = getStringParam(req.params.userId);
            if (!userId) {
                res.status(400).json({ error: 'User ID is required' });
                return;
            }
            const limitStr = req.query.limit;
            const limit = limitStr ? getNumberParam(limitStr as string) : undefined;
            const sessions = await this.focusSessionService.getUserSessions(
                userId,
                limit
            );
            res.json({ success: true, data: sessions });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getSessionStats(req: Request, res: Response): Promise<void> {
        try {
            const userId = getStringParam(req.params.userId);
            if (!userId) {
                res.status(400).json({ error: 'User ID is required' });
                return;
            }
            const stats = await this.focusSessionService.getSessionStats(userId);
            res.json({ success: true, data: stats });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getWeeklySessionData(req: Request, res: Response): Promise<void> {
        try {
            const userId = getStringParam(req.params.userId);
            if (!userId) {
                res.status(400).json({ error: 'User ID is required' });
                return;
            }
            const weekData = await this.focusSessionService.getWeeklySessionData(userId);
            res.json({ success: true, data: weekData });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
