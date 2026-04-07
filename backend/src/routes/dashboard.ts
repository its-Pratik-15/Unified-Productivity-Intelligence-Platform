import { Router } from 'express';
import { DashboardController } from '../controllers/DashboardController.js';

const router = Router();
const controller = new DashboardController();

router.get('/:userId', (req, res) => controller.getDashboardData(req, res));

export default router;
