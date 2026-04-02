import { Item } from '../entities/Item.js';
import { Task } from '../entities/Task.js';
import { Note } from '../entities/Note.js';
import { v4 as uuidv4 } from 'uuid';

export class ItemFactory {
    static createItem(
        type: 'TASK' | 'NOTE',
        userId: string,
        data: Record<string, any>
    ): Item {
        const id = uuidv4();

        switch (type) {
            case 'TASK':
                return new Task(
                    id,
                    userId,
                    data.title,
                    data.status || 'pending',
                    data.priority || 'medium'
                );
            case 'NOTE':
                return new Note(id, userId, data.title, data.content);
            default:
                throw new Error(`Unknown item type: ${type}`);
        }
    }
}
