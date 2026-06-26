import mongoose from 'mongoose';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Workout } from '../models/workout';

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(mongoUri);

  await User.deleteMany({});
  await Team.deleteMany({});
  await Activity.deleteMany({});
  await Leaderboard.deleteMany({});
  await Workout.deleteMany({});

  const users = await User.create([
    {
      name: 'Ava Chen',
      email: 'ava.chen@example.com',
      role: 'captain',
      fitnessGoal: 'Build endurance',
    },
    {
      name: 'Leo Martinez',
      email: 'leo.martinez@example.com',
      role: 'member',
      fitnessGoal: 'Increase strength',
    },
    {
      name: 'Mina Patel',
      email: 'mina.patel@example.com',
      role: 'member',
      fitnessGoal: 'Improve mobility',
    },
  ]);

  const teams = await Team.create([
    {
      name: 'Endurance Squad',
      focus: 'stamina',
      members: 8,
      captain: users[0].name,
    },
    {
      name: 'Strength Lab',
      focus: 'power',
      members: 6,
      captain: users[1].name,
    },
  ]);

  await Activity.create([
    {
      type: 'run',
      duration: 35,
      calories: 320,
      userId: users[0]._id.toString(),
    },
    {
      type: 'strength',
      duration: 45,
      calories: 280,
      userId: users[1]._id.toString(),
    },
    {
      type: 'yoga',
      duration: 25,
      calories: 140,
      userId: users[2]._id.toString(),
    },
  ]);

  await Leaderboard.create([
    { name: users[0].name, points: 980, streak: 7 },
    { name: users[1].name, points: 940, streak: 5 },
    { name: users[2].name, points: 910, streak: 4 },
  ]);

  await Workout.create([
    {
      name: 'HIIT Cardio',
      difficulty: 'intermediate',
      duration: 30,
      focus: 'cardio',
    },
    {
      name: 'Core Blast',
      difficulty: 'beginner',
      duration: 20,
      focus: 'core',
    },
    {
      name: 'Power Lift',
      difficulty: 'advanced',
      duration: 45,
      focus: 'strength',
    },
  ]);

  console.log('Seed complete');
  await mongoose.disconnect();
}

seedDatabase().catch((error) => {
  console.error('Seed failed', error);
  process.exit(1);
});
