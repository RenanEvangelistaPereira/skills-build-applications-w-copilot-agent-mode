import { Schema, model } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    rank: { type: Number, required: true, min: 1 },
    userName: { type: String, required: true, trim: true },
    teamName: { type: String, required: true, trim: true },
    points: { type: Number, required: true, min: 0 }
  },
  { timestamps: true, collection: 'leaderboard' }
);

export default model('LeaderboardEntry', leaderboardEntrySchema);