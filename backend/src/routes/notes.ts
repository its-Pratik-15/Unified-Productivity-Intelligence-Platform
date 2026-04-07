import { Router } from 'express';
import { NoteController } from '../controllers/NoteController.js';

const router = Router();
const controller = new NoteController();

router.post('/', (req, res) => controller.createNote(req, res));
router.get('/:userId', (req, res) => controller.getNotes(req, res));
router.patch('/:noteId', (req, res) => controller.updateNote(req, res));

export default router;
