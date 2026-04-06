import type { Request, Response } from 'express';
import { NoteService } from '../services/NoteService.js';
import { getStringParam } from '../utils/helpers.js';

export class NoteController {
    private noteService = new NoteService();

    async createNote(req: Request, res: Response): Promise<void> {
        try {
            const { userId, title, content } = req.body;
            const note = await this.noteService.createNote(userId, title, content);
            res.json({ success: true, data: note });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getNotes(req: Request, res: Response): Promise<void> {
        try {
            const userId = getStringParam(req.params.userId);
            if (!userId) {
                res.status(400).json({ error: 'User ID is required' });
                return;
            }
            const notes = await this.noteService.getNotes(userId);
            res.json({ success: true, data: notes });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateNote(req: Request, res: Response): Promise<void> {
        try {
            const noteId = getStringParam(req.params.noteId);
            if (!noteId) {
                res.status(400).json({ error: 'Note ID is required' });
                return;
            }
            const { title, content } = req.body;
            await this.noteService.updateNote(noteId, title, content);
            res.json({ success: true, message: 'Note updated' });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
