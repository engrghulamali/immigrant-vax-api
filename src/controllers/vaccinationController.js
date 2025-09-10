import { body, param, validationResult } from 'express-validator';
import Vaccination from '../models/Vaccination.js';
import { buildPagination } from '../utils/pagination.js';

export const validateCreate = [
  body('vaccineName').isString().notEmpty(),
  body('dateAdministered').isISO8601().toDate(),
  body('doseNumber').optional().isInt({ min: 1 }),
  body('lotNumber').optional().isString(),
  body('provider').optional().isString(),
  body('country').optional().isString(),
  body('notes').optional().isString().isLength({ max: 1000 })
];

export const validateUpdate = [
  param('id').isMongoId(),
  body('vaccineName').optional().isString().notEmpty(),
  body('dateAdministered').optional().isISO8601().toDate(),
  body('doseNumber').optional().isInt({ min: 1 }),
  body('lotNumber').optional().isString(),
  body('provider').optional().isString(),
  body('country').optional().isString(),
  body('notes').optional().isString().isLength({ max: 1000 })
];

export const validateGetOne = [param('id').isMongoId()];
export const validateDelete = [param('id').isMongoId()];

export async function createVaccination(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const doc = await Vaccination.create({ ...req.body, userUid: req.user.uid });
  res.status(201).json(doc);
}

export async function listVaccinations(req, res) {
  const { page, limit, skip } = buildPagination(req.query);
  const filter = { userUid: req.user.uid };

  if (req.query.vaccineName) filter.vaccineName = new RegExp(req.query.vaccineName, 'i');
  if (req.query.country) filter.country = new RegExp(`^${req.query.country}$`, 'i');
  if (req.query.fromDate || req.query.toDate) {
    filter.dateAdministered = {};
    if (req.query.fromDate) filter.dateAdministered.$gte = new Date(req.query.fromDate);
    if (req.query.toDate) filter.dateAdministered.$lte = new Date(req.query.toDate);
  }

  const [items, total] = await Promise.all([
    Vaccination.find(filter).sort({ dateAdministered: -1 }).skip(skip).limit(limit),
    Vaccination.countDocuments(filter)
  ]);

  res.json({ page, limit, total, items });
}

export async function getVaccination(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const doc = await Vaccination.findOne({ _id: req.params.id, userUid: req.user.uid });
  if (!doc) return res.status(404).json({ message: 'Not found' });
  res.json(doc);
}

export async function updateVaccination(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const doc = await Vaccination.findOneAndUpdate(
    { _id: req.params.id, userUid: req.user.uid },
    req.body,
    { new: true }
  );
  if (!doc) return res.status(404).json({ message: 'Not found' });
  res.json(doc);
}

export async function deleteVaccination(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const doc = await Vaccination.findOneAndDelete({ _id: req.params.id, userUid: req.user.uid });
  if (!doc) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
}
