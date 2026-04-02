// Abstract base class for all items (Task, Note)
export abstract class Item {
    id: string;
    createdAt: Date;

    constructor(id: string) {
        this.id = id;
        this.createdAt = new Date();
    }

    abstract save(): Promise<void>;
}
