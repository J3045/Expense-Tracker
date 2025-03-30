import { useState, useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react"; // Delete icon

function generateColors(count) {
  return Array.from({ length: count }, (_, i) => `hsl(${(i * 137) % 360}, 70%, 50%)`);
}

function ExpenseList() {
  const { expenses, loading, deleteExpense, editExpense, fetchExpenses } = useContext(ExpenseContext);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null); // Expense to delete
  const [isDeleting, setIsDeleting] = useState(false);

  const categories = [...new Set(expenses.map((exp) => exp.category))];
  const categoryColors = generateColors(categories.length);
  const colorMap = Object.fromEntries(categories.map((cat, i) => [cat, categoryColors[i]]));

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount") {
      // Ensure the amount is a positive number
      if (Number(value) < 0) {
        return; // Do not update state with a negative amount
      }
    }

    setSelectedExpense({ ...selectedExpense, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!selectedExpense || Number(selectedExpense.amount) <= 0) {
      alert("Amount must be a positive number!");
      return;
    }

    await editExpense(selectedExpense._id, {
      ...selectedExpense,
      amount: Number(selectedExpense.amount),
    });

    fetchExpenses();
    setSelectedExpense(null);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    
    await deleteExpense(deleteConfirm._id);
    
    fetchExpenses();
    
    setDeleteConfirm(null);
    setIsDeleting(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">
      <h2 className="text-3xl font-semibold mb-6 text-gray-700">💰 Expense History</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : expenses.length === 0 ? (
        <p className="text-center text-gray-500">No expenses recorded yet.</p>
      ) : (
        <ul className="space-y-4">
          {expenses.map((expense) => (
            <li
              key={expense._id}
              className="flex justify-between items-center p-4 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-300"
              style={{ backgroundColor: `${colorMap[expense.category]}1A` }} // Light background color
            >
              <div>
                <span
                  className="inline-block px-3 py-1 text-sm font-medium rounded-full text-white"
                  style={{ backgroundColor: colorMap[expense.category] }} // Matching category color
                >
                  {expense.category}
                </span>
                <p className="mt-1 text-lg font-medium text-gray-800">
                  ₹{expense.amount}{" "}
                  <span className="text-gray-500 text-sm">
                    on {new Date(expense.date).toLocaleDateString()}
                  </span>
                </p>
              </div>
              <div className="flex space-x-2">
                {/* Edit Button & Modal */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-blue-500 hover:text-white transition-all border border-blue-500"
                      onClick={() => setSelectedExpense(expense)}
                    >
                      ✏️ Edit
                    </Button>
                  </DialogTrigger>
                  {selectedExpense && (
                    <DialogContent className="bg-white p-6 rounded-2xl shadow-xl max-w-md mx-auto">
                      <DialogHeader className="text-center">
                        <DialogTitle className="text-blue-500 text-xl font-semibold">
                          Edit Expense
                        </DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleEditSubmit} className="space-y-6">
                        {/* Category */}
                        <div>
                          <Label className="text-gray-600 text-sm">Category</Label>
                          <select
                            name="category"
                            value={selectedExpense.category}
                            onChange={handleEditChange}
                            required
                            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 bg-white"
                          >
                            <option value="Food">🍕 Food</option>
                            <option value="Transport">🚕 Transport</option>
                            <option value="Shopping">🛍️ Shopping</option>
                            <option value="Entertainment">🎬 Entertainment</option>
                            <option value="Healthcare">💊 Healthcare</option>
                            <option value="Other">🔹 Other</option>
                          </select>
                        </div>
                        {/* Amount */}
                        <div>
                          <Label className="text-gray-600 text-sm">Amount (₹)</Label>
                          <Input
                            type="number"
                            name="amount"
                            value={selectedExpense.amount}
                            onChange={handleEditChange}
                            min="0"  // Prevents negative values
                            required
                            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        {/* Date */}
                        <div>
                          <Label className="text-gray-600 text-sm">Date</Label>
                          <Input
                            type="date"
                            name="date"
                            value={selectedExpense.date.split("T")[0]}
                            onChange={handleEditChange}
                            required
                            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        {/* Description */}
                        <div>
                          <Label className="text-gray-600 text-sm">Description</Label>
                          <Textarea
                            name="description"
                            value={selectedExpense.description}
                            onChange={handleEditChange}
                            rows={3}
                            required
                            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter a short note"
                          />
                        </div>
                        {/* Buttons */}
                        <DialogFooter className="flex justify-between mt-4">
                          <Button variant="outline" onClick={() => setSelectedExpense(null)}>❌ Cancel</Button>
                          <Button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600">
                            ✅ Save Changes
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  )}
                </Dialog>

                {/* Delete Button & Confirmation Modal */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      className="bg-black text-white hover:bg-gray-800 transition-all border border-black flex items-center space-x-1"
                      onClick={() => setDeleteConfirm(expense)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </DialogTrigger>
                  {deleteConfirm && (
                    <DialogContent className="bg-white p-6 rounded-2xl shadow-xl max-w-md mx-auto">
                      <DialogHeader className="text-center">
                        <DialogTitle className="text-red-500 text-xl font-semibold">
                          Confirm Deletion
                        </DialogTitle>
                      </DialogHeader>
                      <DialogFooter className="flex justify-between mt-4">
                        <Button variant="outline" onClick={() => setDeleteConfirm(null)}>❌ Cancel</Button>
                        <Button onClick={handleDelete} className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600">
                          {isDeleting ? "Deleting..." : "🗑️ Delete"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  )}
                </Dialog>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExpenseList;
