"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("./models/user");
const team_1 = require("./models/team");
const activity_1 = require("./models/activity");
const leaderboard_1 = require("./models/leaderboard");
const workout_1 = require("./models/workout");
const database_1 = require("./database");
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8000;
const getApiBaseUrl = () => {
    const codespaceName = process.env.CODESPACE_NAME;
    return codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : `http://localhost:${port}`;
};
app.use(express_1.default.json());
app.get(['/api/users', '/api/users/'], async (_req, res) => {
    const users = await user_1.User.find({}).lean();
    res.json(users);
});
app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
    const teams = await team_1.Team.find({}).lean();
    res.json(teams);
});
app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    const activities = await activity_1.Activity.find({}).lean();
    res.json(activities);
});
app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
    const leaderboard = await leaderboard_1.Leaderboard.find({}).lean();
    res.json(leaderboard);
});
app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
    const workouts = await workout_1.Workout.find({}).lean();
    res.json(workouts);
});
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'octofit-backend',
        apiBaseUrl: getApiBaseUrl(),
    });
});
app.get('/api', (_req, res) => {
    res.json({
        message: 'OctoFit Tracker API',
        endpoints: ['/api/users', '/api/teams', '/api/activities', '/api/leaderboard', '/api/workouts'],
    });
});
const startServer = async () => {
    try {
        await (0, database_1.connectToDatabase)();
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('MongoDB connection failed, continuing without database', error);
        process.exit(1);
    }
    app.listen(port, () => {
        console.log(`Backend listening on port ${port}`);
    });
};
startServer();
