import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    userName: { type: String, required: true, trim: true },
    activityType: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    activityDate: { type: Date, required: true }
  },
  { timestamps: true }
);

export default model('Activity', activitySchema);