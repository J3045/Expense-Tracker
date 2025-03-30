import { useState, useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

function ExpenseForm() {
  const { addExpense } = useContext(ExpenseContext);
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    date: new Date().toISOString().slice(0, 10),
    description: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // **Validation**
    if (formData.amount === "" || isNaN(formData.amount) || Number(formData.amount) <= 0) {
      setErrorMessage("❌ Amount must be a positive number.");
      return;
    }
    if (!formData.category) {
      setErrorMessage("❌ Please select a category.");
      return;
    }
    if (!formData.description.trim()) {
      setErrorMessage("❌ Description cannot be empty.");
      return;
    }

    // **Proceed to Add Expense**
    await addExpense({
      ...formData,
      amount: Number(formData.amount), // Convert amount to number
    });

    // **Reset form & show success message**
    setFormData({
      amount: "",
      category: "",
      date: new Date().toISOString().slice(0, 10),
      description: "",
    });

    setSuccessMessage("✅ Expense added successfully!");
    setErrorMessage("");

    // Hide success message after 3 seconds
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <Card className="shadow-md border border-gray-300 rounded-xl p-4 sm:p-6 bg-white w-full max-w-lg mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl sm:text-2xl font-semibold text-blue-600">
          💰 Add New Expense
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 text-green-600 text-center bg-green-100 p-3 rounded-lg border border-green-300">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 text-red-600 text-center bg-red-100 p-3 rounded-lg border border-red-300">
            {errorMessage}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Amount */}
            <div>
              <Label className="text-gray-700 text-sm">Amount (₹)</Label>
              <Input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                min="1" // Prevents negative & zero values
                className="mt-1 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                placeholder="Enter amount"
              />
            </div>

            {/* Date */}
            <div>
              <Label className="text-gray-700 text-sm">Date</Label>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="mt-1 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <Label className="text-gray-700 text-sm">Category</Label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="mt-1 border border-gray-300 px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="" disabled>Select Category</option>
              <option value="Food">🍕 Food</option>
              <option value="Transport">🚕 Transport</option>
              <option value="Shopping">🛍️ Shopping</option>
              <option value="Entertainment">🎬 Entertainment</option>
              <option value="Healthcare">💊 Healthcare</option>
              <option value="Other">🔹 Other</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <Label className="text-gray-700 text-sm">Description</Label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="mt-1 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 w-full resize-none"
              placeholder="Enter a short note"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full mt-2 bg-blue-600 text-white py-3 sm:py-4 rounded-lg text-lg hover:bg-blue-700 transition-all"
          >
            ➕ Add Expense
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default ExpenseForm;
