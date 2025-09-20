import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Requirement from '../src/models/Requirement.js';
import { connectDB } from '../src/config/db.js';

dotenv.config();

const seed = [
  {
    country: 'United States',
    vaccines: [
      { name: 'MMR', minDoses: 2, notes: 'Measles, Mumps, Rubella' },
      { name: 'Tdap', minDoses: 1, notes: 'Tetanus, Diphtheria, Pertussis' },
      { name: 'Varicella', minDoses: 2, notes: 'Chickenpox' },
      { name: 'Hepatitis B', minDoses: 3 },
      { name: 'Polio', minDoses: 3 },
      { name: 'Meningococcal ACWY', minDoses: 1 },
      { name: 'Influenza', minDoses: 1, notes: 'Annual seasonal flu shot' }
    ],
    source: 'Sample data for demo only'
  },
  {
    country: 'Canada',
    vaccines: [
      { name: 'MMR', minDoses: 2 },
      { name: 'Tdap', minDoses: 1 },
      { name: 'Varicella', minDoses: 2 },
      { name: 'Hepatitis B', minDoses: 3 },
      { name: 'Polio', minDoses: 3 },
      { name: 'Meningococcal', minDoses: 1 }
    ],
    source: 'Sample data for demo only'
  },
  {
    country: 'Australia',
    vaccines: [
      { name: 'MMR', minDoses: 2 },
      { name: 'DTPa', minDoses: 1, notes: 'or Tdap equivalent' },
      { name: 'Varicella', minDoses: 2 },
      { name: 'Hepatitis B', minDoses: 3 }
    ],
    source: 'Sample data for demo only'
  },
  {
    country: 'United Kingdom',
    vaccines: [
      { name: 'MMR', minDoses: 2 },
      { name: 'DTaP/IPV', minDoses: 4, notes: 'Diphtheria, Tetanus, Pertussis, Polio' },
      { name: 'MenACWY', minDoses: 1 },
      { name: 'Hib', minDoses: 1, notes: 'Haemophilus influenzae type b' }
    ],
    source: 'Sample data for demo only'
  },
  {
    country: 'India',
    vaccines: [
      { name: 'BCG', minDoses: 1, notes: 'Tuberculosis' },
      { name: 'OPV', minDoses: 3, notes: 'Oral Polio Vaccine' },
      { name: 'DPT', minDoses: 3 },
      { name: 'MMR', minDoses: 2 },
      { name: 'Hepatitis B', minDoses: 3 }
    ],
    source: 'Sample data for demo only'
  },
  {
    country: 'Germany',
    vaccines: [
      { name: 'MMR', minDoses: 2 },
      { name: 'DTaP', minDoses: 3 },
      { name: 'Polio', minDoses: 3 },
      { name: 'Hepatitis B', minDoses: 3 },
      { name: 'Varicella', minDoses: 2 }
    ],
    source: 'Sample data for demo only'
  },
  {
    country: 'Brazil',
    vaccines: [
      { name: 'BCG', minDoses: 1 },
      { name: 'Polio', minDoses: 3 },
      { name: 'MMR', minDoses: 2 },
      { name: 'Hepatitis B', minDoses: 3 },
      { name: 'Yellow Fever', minDoses: 1 }
    ],
    source: 'Sample data for demo only'
  },
  {
    country: 'Japan',
    vaccines: [
      { name: 'BCG', minDoses: 1 },
      { name: 'DPT-IPV', minDoses: 4 },
      { name: 'MR', minDoses: 2, notes: 'Measles and Rubella' },
      { name: 'Hib', minDoses: 1 },
      { name: 'Varicella', minDoses: 2 }
    ],
    source: 'Sample data for demo only'
  },
  {
    country: 'Pakistan',
    vaccines: [
      { name: 'BCG', minDoses: 1, notes: 'Tuberculosis' },
      { name: 'OPV', minDoses: 3, notes: 'Oral Polio Vaccine' },
      { name: 'Pentavalent', minDoses: 3, notes: 'DPT-HepB-Hib combo' },
      { name: 'MMR', minDoses: 2 },
      { name: 'Hepatitis B', minDoses: 3 }
    ],
    source: 'Sample data for demo only'
  },
  {
    country: 'Saudi Arabia',
    vaccines: [
      { name: 'BCG', minDoses: 1 },
      { name: 'OPV', minDoses: 3 },
      { name: 'DTP', minDoses: 3 },
      { name: 'MMR', minDoses: 2 },
      { name: 'Meningococcal ACWY', minDoses: 1, notes: 'Mandatory for Hajj pilgrims' }
    ],
    source: 'Sample data for demo only'
  }
];

(async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    await Requirement.deleteMany({});
    await Requirement.insertMany(seed);
    console.log('✅ Seeded country requirements');
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.disconnect();
  }
})();
