import { Router } from "express";
import { register, login, forgotPassword, updateProfile } from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.patch('/me', requireAuth, updateProfile);
// Backwards-compatible: accept POST to /me from clients that can't send PATCH
router.post('/me', requireAuth, updateProfile);
// Admin: list all users
import { listUsers } from '../controllers/userController.js';
router.get('/list', requireAuth, (req, res, next) => {
	// only admins can list
	if (!req.user || req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
	next();
}, async (req, res) => {
	// delegate to controller
	return listUsers(req, res);
});

export default router;
