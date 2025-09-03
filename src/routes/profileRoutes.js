import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { deleteMe, getMe, upsertProfile, validateUpsert } from '../controllers/profileController.js';

const router = Router();
router.use(requireAuth);

router.get('/me', getMe);
router.post('/', validateUpsert, upsertProfile);
router.put('/', validateUpsert, upsertProfile);
router.delete('/', deleteMe);

export default router;
