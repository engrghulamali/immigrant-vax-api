import { body, param, query, validationResult } from 'express-validator';
import Reminder from '../models/Reminder.js';

export const validateCreate = [
  body('title').isString().notEmpty(),
  body('dueAt').isISO8601().toDate(),
  body('linkedVaccinationId').optional().isMongoId(),
  body('channel').optional().isIn(['in-app', 'email', 'sms'])
];

export const validateList = [
  query('dueBefore').optional().isISO8601().toDate()
];

export const validateDelete = [param('id').isMongoId()];

export async function createReminder(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const doc = await Reminder.create({ ...req.body, userUid: req.user.uid });
  res.status(201).json(doc);
}

export async function listReminders(req, res) {
  const filter = { userUid: req.user.uid };
  if (req.query.dueBefore) {
    filter.dueAt = { $lte: new Date(req.query.dueBefore) };
  }
  const items = await Reminder.find(filter).sort({ dueAt: 1 });
  res.json({ items });
}

export async function deleteReminder(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const doc = await Reminder.findOneAndDelete({ _id: req.params.id, userUid: req.user.uid });
  if (!doc) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
}
