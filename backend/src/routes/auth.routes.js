// all login authorization page routes will be here
import express from 'express';
import { registerUser, getAllUsers } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', registerUser);
router.get('/allUsers', getAllUsers);

export default router;