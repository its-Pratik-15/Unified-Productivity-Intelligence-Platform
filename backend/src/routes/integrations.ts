import { Router } from 'express';
import { IntegrationController } from '../controllers/IntegrationController.js';

const router = Router();
const controller = new IntegrationController();

router.post('/connect', (req, res) => controller.connectIntegration(req, res));
router.post('/disconnect', (req, res) => controller.disconnectIntegration(req, res));
router.get('/:userId', (req, res) => controller.getIntegrations(req, res));

export default router;
