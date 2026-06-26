import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    calories: { type: Number, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true },
);

export const Activity = model('Activity', activitySchema);
