import Expense from "../models/Expense.js";

// ➤ Add an Expense
export const addExpense = async (req, res) => {
  const { amount, category, date, description } = req.body;

  if (!amount || !category || !date || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newExpense = new Expense({
      amount,
      category,
      date,
      description,
      userId: req.user.id, // Attach user ID from authMiddleware
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ➤ Get Expenses for a specific month
export const getExpenses = async (req, res) => {
  const { month } = req.query;

  try {
    let expenses;

    if (month && month !== "all") { // ✅ Allow "all" as a special case
      const start = new Date(`${month}-01`);
      const end = new Date(`${month}-31`);

      expenses = await Expense.find(
        { userId: req.user.id, date: { $gte: start, $lt: new Date(end.getTime() + 86400000) } }
      ).sort({ date: -1 });
    } else {
      // ✅ Fetch all expenses if month is "all"
      expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
    }

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


  

// ➤ Update an Expense
export const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { amount, category, date, description } = req.body;

  try {
    const expense = await Expense.findOne({ _id: id, userId: req.user.id });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;
    expense.date = date || expense.date;
    expense.description = description || expense.description;

    await expense.save();
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ➤ Delete an Expense
export const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ➤ Get Monthly Expense Summary (Category-wise)
export const getSummary = async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ message: "Month is required in YYYY-MM format" });
  }

  try {
    const start = new Date(`${month}-01`);
    const end = new Date(`${month}-31`);

    const summary = await Expense.aggregate([
      { $match: { userId: req.user.id, date: { $gte: start, $lt: new Date(end.getTime() + 86400000) } } }, // ✅ Optimized range
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $sort: { total: -1 } },
    ]).hint({ date: 1 }); // ✅ Use Index

    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

