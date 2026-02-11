// all login authorization page routes will be here
import express from 'express';
import { registerUser, getAllUsers, loginUser } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/allUsers', protect, getAllUsers);

export default router;