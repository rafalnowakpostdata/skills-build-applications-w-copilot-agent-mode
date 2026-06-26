"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
const database_1 = require("../config/database");
async function seedDatabase() {
    console.log('Seed the octofit_db database with test data');
    await mongoose_1.default.connect(database_1.mongoUri);
    await user_1.User.deleteMany({});
    await team_1.Team.deleteMany({});
    await activity_1.Activity.deleteMany({});
    await leaderboard_1.Leaderboard.deleteMany({});
    await workout_1.Workout.deleteMany({});
    const users = await user_1.User.create([
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
    const teams = await team_1.Team.create([
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
    await activity_1.Activity.create([
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
    await leaderboard_1.Leaderboard.create([
        { name: users[0].name, points: 980, streak: 7 },
        { name: users[1].name, points: 940, streak: 5 },
        { name: users[2].name, points: 910, streak: 4 },
    ]);
    await workout_1.Workout.create([
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
    await mongoose_1.default.disconnect();
}
seedDatabase().catch((error) => {
    console.error('Seed failed', error);
    process.exit(1);
});
