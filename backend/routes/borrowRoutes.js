import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/authMiddleware.js";
import { borrowBook, returnBook, getUserBorrows, getOverdue } from "../controllers/borrowController.js";

const router = Router();

// user borrows a book
router.post("/", requireAuth, borrowBook);

// return a borrow record
router.post("/:id/return", requireAuth, returnBook);

// get current user's borrows
router.get("/me", requireAuth, getUserBorrows);

// admin: list overdue
router.get("/overdue", requireAuth, requireRole("admin"), getOverdue);

export default router;
