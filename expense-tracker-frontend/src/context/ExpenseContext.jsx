import { createContext, useState, useEffect, useCallback } from "react";

export const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM
  const [loading, setLoading] = useState(false);

  // Fetch expenses from API
  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`http://localhost:5000/api/expenses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
    setLoading(false);
  }, [month]);

  // Fetch expenses when month changes
  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  // ✅ Add Expense
  const addExpense = async (expense) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch("http://localhost:5000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(expense),
      });

      if (!response.ok) throw new Error(`Failed to add expense: ${response.status}`);

      fetchExpenses(); // Refresh after adding
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  // ✅ Edit Expense
  const editExpense = async (expenseId, updatedExpense) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`http://localhost:5000/api/expenses/${expenseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedExpense),
      });

      if (!response.ok) throw new Error(`Failed to update expense: ${response.status}`);

      setExpenses((prevExpenses) =>
        prevExpenses.map((exp) => (exp._id === expenseId ? { ...exp, ...updatedExpense } : exp))
      );
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  // ✅ Delete Expense
  const deleteExpense = async (expenseId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`http://localhost:5000/api/expenses/${expenseId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error(`Failed to delete expense: ${response.status}`);

      setExpenses(expenses.filter((expense) => expense._id !== expenseId)); // Update state after deletion
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, editExpense, deleteExpense, month, setMonth, loading, fetchExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
}
