// src/controllers/authController.js
import fetch from 'node-fetch';
import { validationResult, body } from 'express-validator';
import dotenv from 'dotenv';
dotenv.config();
// Firebase Web API key (get it from Firebase console > Project Settings > Web API Key)
const API_KEY = process.env.FIREBASE_WEB_API_KEY;

export const validateLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

export async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ message: data.error.message });
    }

    res.json({
      message: 'Login successful',
      uid: data.localId,
      email: data.email,
      idToken: data.idToken,
      refreshToken: data.refreshToken,
      expiresIn: data.expiresIn
    });
    console.log(data);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
}
