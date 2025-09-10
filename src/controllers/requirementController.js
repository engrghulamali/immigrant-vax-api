import Requirement from '../models/Requirement.js';

export async function getByCountry(req, res) {
  const country = (req.params.country || '').trim();
  if (!country) return res.status(400).json({ message: 'Country name required' });

  const doc = await Requirement.findOne({ country: new RegExp(`^${country}$`, 'i') });
  if (!doc) return res.status(404).json({ message: 'No requirements found for this country' });
  res.json(doc);
}
export async function getAllRequirements(req, res) {
  try {
    const docs = await Requirement.find({});
    res.json(docs);
  } catch (error) {
    console.error('Error fetching requirements:', error);
    res.status(500).json({ message: 'Server error fetching requirements' });
  }
}
