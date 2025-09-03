import mongoose from 'mongoose';

const ReminderSchema = new mongoose.Schema(
  {
    userUid: { type: String, required: true, index: true },
    title: { type: String, required: true },
    dueAt: { type: Date, required: true },
    linkedVaccinationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vaccination' },
    channel: { type: String, enum: ['in-app', 'email', 'sms'], default: 'in-app' },
    sent: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('Reminder', ReminderSchema);
