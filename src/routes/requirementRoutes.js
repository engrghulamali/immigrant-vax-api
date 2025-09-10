import { Router } from 'express';
import { getByCountry, getAllRequirements } from '../controllers/requirementController.js';

const router = Router();

// Public route: no auth required
router.get('/:country', getByCountry);
router.get('/', getAllRequirements);

export default router;
