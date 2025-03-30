import express from "express";
import { addExpense, getExpenses, updateExpense, deleteExpense, getSummary } from "../controllers/expenseController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect routes using authMiddleware
router.post("/", authMiddleware, addExpense);
router.get("/", authMiddleware, getExpenses);
router.put("/:id", authMiddleware, updateExpense);
router.delete("/:id", authMiddleware, deleteExpense);
router.get("/summary", authMiddleware, getSummary);

export default router;
