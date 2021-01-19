import express from 'express';
const router = express.Router();
import {
  merchantSubscription,
  makePayment
} from '../controllers/merchantController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, admin, merchantSubscription);
router.route('/').post(protect, admin, makePayment);

export default router;
