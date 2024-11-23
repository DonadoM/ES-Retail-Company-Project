import express from 'express';
import { protect, admin } from '../middlewares/authMiddleware';
import { getAdminDashboard } from '../controllers/adminController';

const router = express.Router();

router.get('/dashboard', protect, admin, getAdminDashboard);

export default router;