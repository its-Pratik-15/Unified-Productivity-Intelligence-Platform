import { ItemFactory } from '../core/ItemFactory.js';
import { NotePipeline } from '../workflows/pipeline.js';
import { Database } from '../core/Database.js';
import { Note } from '../entities/Note.js';

export class NoteService {
    private db = Database.getInstance();
    private pipeline = new NotePipeline();

    async createNote(
        userId: string,
        title: string,
        content: string
    ): Promise<Note> {
        const note = ItemFactory.createItem('NOTE', userId, {
            title,
            content,
        }) as Note;

        await this.pipeline.execute(note);

        const prisma = this.db.getPrisma();
        await prisma.note.create({
            data: {
                id: note.id,
                userId,
                title: note.title,
                content: note.content,
            },
        });

        return note;
    }

    async getNotes(userId: string): Promise<Note[]> {
        const prisma = this.db.getPrisma();
        const notes = await prisma.note.findMany({
            where: { userId },
        });

        return notes.map((n) => new Note(n.id, n.userId, n.title, n.content));
    }

    async updateNote(
        noteId: string,
        title: string,
        content: string
    ): Promise<void> {
        const prisma = this.db.getPrisma();
        await prisma.note.update({
            where: { id: noteId },
            data: { title, content },
        });
    }
}
