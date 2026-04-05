import { ItemFactory } from '../core/ItemFactory.js';
import { TaskPipeline } from '../workflows/pipeline.js';
import { Database } from '../core/Database.js';
import { Task } from '../entities/Task.js';

export class TaskService {
    private db = Database.getInstance();
    private pipeline = new TaskPipeline();

    async createTask(
        userId: string,
        title: string,
        priority: 'low' | 'medium' | 'high' = 'medium'
    ): Promise<Task> {
        const task = ItemFactory.createItem('TASK', userId, {
            title,
            priority,
        }) as Task;

        await this.pipeline.execute(task);

        const prisma = this.db.getPrisma();
        await prisma.task.create({
            data: {
                id: task.id,
                userId,
                title: task.title,
                status: task.status,
                priority: task.priority,
            },
        });

        return task;
    }

    async getTasks(userId: string): Promise<Task[]> {
        const prisma = this.db.getPrisma();
        const tasks = await prisma.task.findMany({
            where: { userId },
        });

        return tasks.map(
            (t) =>
                new Task(t.id, t.userId, t.title, t.status as any, t.priority as any)
        );
    }

    async updateTaskStatus(
        taskId: string,
        status: 'pending' | 'in-progress' | 'completed'
    ): Promise<void> {
        const prisma = this.db.getPrisma();
        await prisma.task.update({
            where: { id: taskId },
            data: { status },
        });
    }
}
