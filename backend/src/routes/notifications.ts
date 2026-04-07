import { Router } from 'express';
import { NotificationController } from '../controllers/NotificationController.js';

const router = Router();
const controller = new NotificationController();

// Reminder endpoints
router.post('/reminders', (req, res) => controller.createReminder(req, res));
router.get('/reminders/:userId', (req, res) => controller.getReminders(req, res));
router.delete('/reminders/:reminderId', (req, res) => controller.deleteReminder(req, res));
router.post('/reminders/send-email', (req, res) => controller.sendReminderEmail(req, res));

export default router;
