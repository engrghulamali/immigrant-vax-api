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
      { name: 'Varicella', minDoses: 2 },
      { name: 'Hepatitis B', minDoses: 3 },
      { name: 'Polio', minDoses: 3 }
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
      { name: 'Polio', minDoses: 3 }
    ],
    source: 'Sample data for demo only'
  },
  {
    country: 'Australia',
    vaccines: [
      { name: 'MMR', minDoses: 2 },
      { name: 'DTPa', minDoses: 1, notes: 'or Tdap equivalent' },
      { name: 'Varicella', minDoses: 2 }
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
