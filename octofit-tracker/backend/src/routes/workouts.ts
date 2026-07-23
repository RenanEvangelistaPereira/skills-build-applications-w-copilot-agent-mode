import { Router } from 'express';
import Workout from '../models/Workout';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const data = await Workout.find().sort({ difficulty: 1, title: 1 });
    res.json({ collection: 'workouts', data });
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch workouts', error });
  }
});

export default router;