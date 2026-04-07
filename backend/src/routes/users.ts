import { Router } from 'express';
import { UserController } from '../controllers/UserController.js';

const router = Router();
const controller = new UserController();

router.post('/', (req, res) => controller.createUser(req, res));
router.get('/:userId', (req, res) => controller.getUser(req, res));

export default router;
