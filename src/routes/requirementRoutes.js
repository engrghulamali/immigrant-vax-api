import { Router } from 'express';
import { getByCountry } from '../controllers/requirementController.js';

const router = Router();

// Public route: no auth required
router.get('/:country', getByCountry);

export default router;
