import express from 'express';
const router = express.Router();
import { merchantSubscription } from '../controllers/merchantController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, admin, merchantSubscription);

export default router;
