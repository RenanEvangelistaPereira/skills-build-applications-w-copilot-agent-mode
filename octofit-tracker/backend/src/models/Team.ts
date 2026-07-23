import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    motto: { type: String, required: true, trim: true },
    memberCount: { type: Number, required: true, min: 0 },
    weeklyPoints: { type: Number, required: true, min: 0 }
  },
  { timestamps: true }
);

export default model('Team', teamSchema);