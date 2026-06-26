import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    name: { type: String, required: true },
    points: { type: Number, required: true },
    streak: { type: Number, required: true },
  },
  { timestamps: true },
);

export const Leaderboard = model('Leaderboard', leaderboardSchema);
