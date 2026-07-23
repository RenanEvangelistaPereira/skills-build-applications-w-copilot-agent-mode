import express from 'express';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import teamsRouter from './routes/teams';
import usersRouter from './routes/users';
import workoutsRouter from './routes/workouts';

export const PORT = 8000;

export function createApp(baseUrl: string) {
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
      baseUrl,
      database: 'mongodb://localhost:27017/octofit_db'
    });
  });

  return app;
}
