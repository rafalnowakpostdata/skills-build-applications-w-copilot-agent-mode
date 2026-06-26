import express from 'express';
import { User } from './models/user';
import { Team } from './models/team';
import { Activity } from './models/activity';
import { Leaderboard } from './models/leaderboard';
import { Workout } from './models/workout';
import { connectToDatabase } from './config/database';

const app = express();
const port = Number(process.env.PORT) || 8000;

const getApiBaseUrl = () => {
  const codespaceName = process.env.CODESPACE_NAME;
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
};

app.use(express.json());

app.get(['/api/users', '/api/users/'], async (_req, res) => {
  const users = await User.find({}).lean();
  res.json(users);
});

app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
  const teams = await Team.find({}).lean();
  res.json(teams);
});

app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
  const activities = await Activity.find({}).lean();
  res.json(activities);
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
  const leaderboard = await Leaderboard.find({}).lean();
  res.json(leaderboard);
});

app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
  const workouts = await Workout.find({}).lean();
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
    await connectToDatabase();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed, continuing without database', error);
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
  });
};

startServer();
