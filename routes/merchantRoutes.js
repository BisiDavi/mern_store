import express from 'express';
const router = express.Router();
import {
  authMerchant,
  registerMerchant,
  getMerchantProfile,
  updateMerchantProfile,
  getMerchants,
  deleteMerchant,
  getMerchantById,
  updateMerchant
} from '../controllers/merchantController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(registerMerchant).get(protect, admin, getMerchants);
router.post('/login', authMerchant);
router
  .route('/profile')
  .get(protect, getMerchantProfile)
  .put(protect, updateMerchantProfile);
router
  .route('/:id')
  .delete(protect, admin, deleteMerchant)
  .get(protect, admin, getMerchantById)
  .put(protect, admin, updateMerchant);

export default router;
