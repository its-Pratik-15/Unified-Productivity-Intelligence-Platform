import { Item } from './Item.js';

export class Task extends Item {
    title: string;
    status: 'pending' | 'in-progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    dueDate?: Date;
    children: Task[] = [];
    parentId?: string;
    userId: string;

    constructor(
        id: string,
        userId: string,
        title: string,
        status: 'pending' | 'in-progress' | 'completed' = 'pending',
        priority: 'low' | 'medium' | 'high' = 'medium'
    ) {
        super(id);
        this.userId = userId;
        this.title = title;
        this.status = status;
        this.priority = priority;
    }

    addChild(task: Task): void {
        task.parentId = this.id;
        this.children.push(task);
    }

    async save(): Promise<void> {
        // Implementation in repository
    }
}
