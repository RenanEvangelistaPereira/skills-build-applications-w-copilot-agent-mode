import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    displayName: { type: String, required: true, trim: true },
    fitnessGoal: { type: String, required: true, trim: true },
    weeklyActivityMinutes: { type: Number, required: true, min: 0 }
  },
  { timestamps: true }
);

export default model('User', userSchema);