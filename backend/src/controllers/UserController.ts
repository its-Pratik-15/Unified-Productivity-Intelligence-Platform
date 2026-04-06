import type { Request, Response } from 'express';
import { Database } from '../core/Database.js';
import { getStringParam } from '../utils/helpers.js';

export class UserController {
    private db = Database.getInstance();

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const { email, name } = req.body;
            const prisma = this.db.getPrisma();

            const user = await prisma.user.create({
                data: {
                    email,
                    name: name || null,
                },
            });

            res.json({ success: true, data: user });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = getStringParam(req.params.userId);
            const prisma = this.db.getPrisma();

            const user = await prisma.user.findUnique({
                where: { id: userId },
            });

            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }

            res.json({ success: true, data: user });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
