import { Router } from 'express';
import { TaskController } from '../controllers/TaskController.js';

const router = Router();
const controller = new TaskController();

router.post('/', (req, res) => controller.createTask(req, res));
router.get('/:userId', (req, res) => controller.getTasks(req, res));
router.patch('/:taskId/status', (req, res) => controller.updateTaskStatus(req, res));

export default router;
