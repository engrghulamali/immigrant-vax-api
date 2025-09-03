import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true }, // Firebase UID
    email: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    dateOfBirth: { type: Date },
    countryOfOrigin: { type: String },
    notes: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
