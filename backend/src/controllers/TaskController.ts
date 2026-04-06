import type { Request, Response } from 'express';
import { TaskService } from '../services/TaskService.js';
import { getStringParam } from '../utils/helpers.js';

export class TaskController {
    private taskService = new TaskService();

    async createTask(req: Request, res: Response): Promise<void> {
        try {
            const { userId, title, priority } = req.body;
            const task = await this.taskService.createTask(userId, title, priority);
            res.json({ success: true, data: task });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getTasks(req: Request, res: Response): Promise<void> {
        try {
            const userId = getStringParam(req.params.userId);
            if (!userId) {
                res.status(400).json({ error: 'User ID is required' });
                return;
            }
            const tasks = await this.taskService.getTasks(userId);
            res.json({ success: true, data: tasks });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateTaskStatus(req: Request, res: Response): Promise<void> {
        try {
            const taskId = getStringParam(req.params.taskId);
            if (!taskId) {
                res.status(400).json({ error: 'Task ID is required' });
                return;
            }
            const { status } = req.body;
            await this.taskService.updateTaskStatus(taskId, status);
            res.json({ success: true, message: 'Task updated' });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
