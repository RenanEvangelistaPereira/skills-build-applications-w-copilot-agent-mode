import { Router } from 'express';
import Team from '../models/Team';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const data = await Team.find().sort({ weeklyPoints: -1 });
    res.json({ collection: 'teams', data });
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch teams', error });
  }
});

export default router;