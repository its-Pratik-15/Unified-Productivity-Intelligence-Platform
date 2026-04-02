import { Item } from './Item.js';

export class Note extends Item {
    title: string;
    content: string;
    userId: string;
    updatedAt: Date;

    constructor(id: string, userId: string, title: string, content: string) {
        super(id);
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.updatedAt = new Date();
    }

    async save(): Promise<void> {
        // Implementation in repository
    }
}
