import { Router } from 'express';
import LeaderboardEntry from '../models/LeaderboardEntry';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const data = await LeaderboardEntry.find().sort({ rank: 1 });
    res.json({ collection: 'leaderboard', data });
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch leaderboard', error });
  }
});

export default router;