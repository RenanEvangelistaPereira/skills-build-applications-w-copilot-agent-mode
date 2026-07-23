import { Router } from 'express';
import Activity from '../models/Activity';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const data = await Activity.find().sort({ activityDate: -1 });
    res.json({ collection: 'activities', data });
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch activities', error });
  }
});

export default router;