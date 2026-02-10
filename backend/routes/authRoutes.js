import { Router } from "express";
import { register, login, forgotPassword, updateProfile } from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.patch('/me', requireAuth, updateProfile);
router.post('/me', requireAuth, updateProfile);
// Admin: list all users (remove auth for demo)
import { listUsers } from '../controllers/userController.js';
router.get('/list', listUsers);

export default router;
