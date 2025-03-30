import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true, index: true },  // ✅ Add Index Here
  description: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true }, // Index for faster user-based queries
});

const Expense = mongoose.model("Expense", ExpenseSchema);
export default Expense;
