import { Router } from 'express';
import { FocusSessionController } from '../controllers/FocusSessionController.js';

const router = Router();
const controller = new FocusSessionController();

router.post('/', (req, res) => controller.createSession(req, res));
router.get('/:userId', (req, res) => controller.getUserSessions(req, res));
router.get('/:userId/stats', (req, res) => controller.getSessionStats(req, res));
router.get('/:userId/weekly', (req, res) => controller.getWeeklySessionData(req, res));

export default router;
