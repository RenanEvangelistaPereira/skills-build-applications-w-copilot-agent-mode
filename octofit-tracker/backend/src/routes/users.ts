import { Router } from 'express';
import User from '../models/User';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const data = await User.find().sort({ displayName: 1 });
    res.json({ collection: 'users', data });
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch users', error });
  }
});

export default router;