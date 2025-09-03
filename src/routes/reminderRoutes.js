import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import {
  createReminder,
  deleteReminder,
  listReminders,
  validateCreate,
  validateDelete,
  validateList
} from '../controllers/reminderController.js';

const router = Router();
router.use(requireAuth);

router.post('/', validateCreate, createReminder);
router.get('/', validateList, listReminders);
router.delete('/:id', validateDelete, deleteReminder);

export default router;
