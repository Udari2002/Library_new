import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/authMiddleware.js";
import { listBooks, createBook, updateBook, deleteBook } from "../controllers/bookController.js";

const router = Router();

router.get("/", requireAuth, listBooks);
router.post("/", requireAuth, requireRole("admin"), createBook);
router.put("/:id", requireAuth, requireRole("admin"), updateBook);
router.delete("/:id", requireAuth, requireRole("admin"), deleteBook);

export default router;
