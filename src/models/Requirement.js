import mongoose from 'mongoose';

const RequirementSchema = new mongoose.Schema(
  {
    country: { type: String, required: true, unique: true },
    vaccines: [
      {
        name: { type: String, required: true },
        minDoses: { type: Number, default: 1 },
        notes: { type: String }
      }
    ],
    source: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('Requirement', RequirementSchema);
