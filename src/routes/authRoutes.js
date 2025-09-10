// src/routes/authRoutes.js
import { Router } from 'express';
import { login, validateLogin, validateSignup, signup } from '../controllers/authController.js';

const router = Router();

router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);

export default router;
