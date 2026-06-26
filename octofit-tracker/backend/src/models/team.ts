import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    focus: { type: String, required: true },
    members: { type: Number, required: true },
    captain: { type: String, required: true },
  },
  { timestamps: true },
);

export const Team = model('Team', teamSchema);
