import express from 'express';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import teamsRouter from './routes/teams';
import usersRouter from './routes/users';
import workoutsRouter from './routes/workouts';

export const PORT = 8000;

export function getBaseUrl() {
  const codespaceName = process.env.CODESPACE_NAME;
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
}

export function createApp() {
  const app = express();

  app.use(express.json());

  app.use('/api/users', usersRouter);
  app.use('/api/teams', teamsRouter);
  app.use('/api/activities', activitiesRouter);
  app.use('/api/leaderboard', leaderboardRouter);
  app.use('/api/workouts', workoutsRouter);

  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'octofit-backend',
      port: PORT,
      baseUrl: getBaseUrl(),
      database: 'mongodb://localhost:27017/octofit_db'
    });
  });

  return app;
}
