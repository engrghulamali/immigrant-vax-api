import { body, validationResult } from 'express-validator';
import User from '../models/User.js';

export const validateUpsert = [
  body('firstName').optional().isString().isLength({ max: 100 }),
  body('lastName').optional().isString().isLength({ max: 100 }),
  body('dateOfBirth').optional().isISO8601().toDate(),
  body('countryOfOrigin').optional().isString().isLength({ max: 120 }),
  body('notes').optional().isString().isLength({ max: 1000 })
];

export async function getMe(req, res) {
  const user = await User.findOne({ uid: req.user.uid });
  if (!user) return res.status(404).json({ message: 'Profile not found' });
  res.json(user);
}

export async function upsertProfile(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const update = {
    uid: req.user.uid,
    email: req.user.email,
    ...req.body
  };

  const options = { new: true, upsert: true, setDefaultsOnInsert: true };
  const doc = await User.findOneAndUpdate({ uid: req.user.uid }, update, options);
  res.status(200).json(doc);
}

export async function deleteMe(req, res) {
  const uid = req.user.uid;
  const [u] = await Promise.all([
    User.findOneAndDelete({ uid }),
  ]);
  await Promise.all([
    (await import('../models/Vaccination.js')).default.deleteMany({ userUid: uid }),
    (await import('../models/Reminder.js')).default.deleteMany({ userUid: uid })
  ]);

  if (!u) return res.status(404).json({ message: 'Profile not found' });
  res.json({ message: 'Profile and related data deleted' });
}
