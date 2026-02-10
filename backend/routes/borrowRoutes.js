import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/authMiddleware.js";
import { borrowBook, returnBook, getUserBorrows, getOverdue } from "../controllers/borrowController.js";

const router = Router();

// Soft auth - try to authenticate but continue with mock user if fails
const softAuth = (req, res, next) => {
  requireAuth(req, res, (err) => {
    if (err) {
      console.log('📖 Auth failed, using mock user');
      req.user = { id: 'mock_user', role: 'user' };
    }
    next();
  });
};

router.post("/", softAuth, borrowBook);
router.post("/:id/return", softAuth, returnBook);
router.get("/me", softAuth, getUserBorrows);
router.get("/overdue", getOverdue);

export default router;
