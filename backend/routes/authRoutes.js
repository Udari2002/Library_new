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

export default router;
