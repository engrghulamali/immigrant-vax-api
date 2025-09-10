// src/routes/authRoutes.js
import { Router } from 'express';
import { login, validateLogin } from '../controllers/authController.js';

const router = Router();

router.post('/login', validateLogin, login);

export default router;
