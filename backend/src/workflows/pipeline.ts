import { Item } from '../entities/Item.js';

export abstract class Pipeline {
    async execute(item: Item): Promise<void> {
        console.log(`[Pipeline] Starting execution for ${item.id}`);

        await this.fetchContext();
        await this.processLogic();
        await this.persist(item);

        console.log(`[Pipeline] Execution completed for ${item.id}`);
    }

    protected abstract fetchContext(): Promise<void>;
    protected abstract processLogic(): Promise<void>;

    protected async persist(item: Item): Promise<void> {
        console.log(`[Pipeline] Persisting item ${item.id}`);
        await item.save();
    }
}

export class TaskPipeline extends Pipeline {
    protected async fetchContext(): Promise<void> {
        console.log('[TaskPipeline] Fetching context...');
    }

    protected async processLogic(): Promise<void> {
        console.log('[TaskPipeline] Processing task logic...');
    }
}

export class NotePipeline extends Pipeline {
    protected async fetchContext(): Promise<void> {
        console.log('[NotePipeline] Fetching context...');
    }

    protected async processLogic(): Promise<void> {
        console.log('[NotePipeline] Processing note logic...');
    }
}
