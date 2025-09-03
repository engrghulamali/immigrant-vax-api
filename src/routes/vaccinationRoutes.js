import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import {
  createVaccination,
  deleteVaccination,
  getVaccination,
  listVaccinations,
  updateVaccination,
  validateCreate,
  validateDelete,
  validateGetOne,
  validateUpdate
} from '../controllers/vaccinationController.js';

const router = Router();
router.use(requireAuth);

router.post('/', validateCreate, createVaccination);
router.get('/', listVaccinations);
router.get('/:id', validateGetOne, getVaccination);
router.put('/:id', validateUpdate, updateVaccination);
router.delete('/:id', validateDelete, deleteVaccination);

export default router;
