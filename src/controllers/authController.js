// src/controllers/authController.js
import fetch from 'node-fetch';
import { validationResult, body } from 'express-validator';
import dotenv from 'dotenv';
import User from '../models/User.js';   // 👈 import User model
dotenv.config();

const API_KEY = process.env.FIREBASE_WEB_API_KEY;

// ================== Validators ==================
export const validateLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

export const validateSignup = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('firstName').optional().isString().isLength({ max: 100 }),
  body('lastName').optional().isString().isLength({ max: 100 }),
  body('dateOfBirth').optional().isISO8601().toDate(),
  body('countryOfOrigin').optional().isString().isLength({ max: 120 }),
  body('notes').optional().isString().isLength({ max: 1000 }),
];

// ================== Login ==================
export async function login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

        const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
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
        expiresIn: data.expiresIn,
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
}

// ================== Signup ==================
export async function signup(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
        // 1️⃣ Create user in Firebase
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
        const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
        });

        const data = await response.json();

        if (data.error) {
        return res.status(400).json({ message: data.error.message });
        }

        // 2️⃣ Prepare update object for MongoDB (same as upsertProfile)
        const update = {
        uid: data.localId,
        email: data.email,
        ...req.body
        };

        const options = { new: true, upsert: true, setDefaultsOnInsert: true };

        // 3️⃣ Save in MongoDB (upsert)
        const doc = await User.findOneAndUpdate({ uid: data.localId }, update, options);

        // 4️⃣ Return both Firebase + Mongo info
        res.status(201).json({
        message: 'Signup successful',
        uid: doc.uid,
        email: doc.email,
        firstName: doc.firstName,
        lastName: doc.lastName,
        dateOfBirth: doc.dateOfBirth,
        countryOfOrigin: doc.countryOfOrigin,
        notes: doc.notes,
        idToken: data.idToken,
        refreshToken: data.refreshToken,
        expiresIn: data.expiresIn
        });

    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ message: 'Signup failed', error: err.message });
    }
}