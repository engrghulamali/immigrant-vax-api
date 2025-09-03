import mongoose from 'mongoose';

const VaccinationSchema = new mongoose.Schema(
  {
    userUid: { type: String, required: true, index: true },
    vaccineName: { type: String, required: true },
    doseNumber: { type: Number, min: 1 },
    dateAdministered: { type: Date, required: true },
    lotNumber: { type: String },
    provider: { type: String },
    country: { type: String },
    documentUrl: { type: String },
    notes: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('Vaccination', VaccinationSchema);
