import { useContext, useState, useEffect } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";

function Analytics() {
  const { expenses } = useContext(ExpenseContext);
  const [month, setMonth] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [category, setCategory] = useState(""); // ✅ New category filter

  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [categoryStats, setCategoryStats] = useState({});
  const [totalExpense, setTotalExpense] = useState(0);
  const [avgExpense, setAvgExpense] = useState(0);
  const [bestCategory, setBestCategory] = useState("");
  const [worstCategory, setWorstCategory] = useState("");

  useEffect(() => {
    let filtered = expenses;

    if (month) filtered = filtered.filter(exp => exp.date.startsWith(month));
    if (minAmount) filtered = filtered.filter(exp => exp.amount >= Number(minAmount));
    if (maxAmount) filtered = filtered.filter(exp => exp.amount <= Number(maxAmount));
    if (category) filtered = filtered.filter(exp => exp.category === category); // ✅ Filtering by category

    setFilteredExpenses(filtered);

    // ✅ Total & Average Expense
    const total = filtered.reduce((sum, exp) => sum + exp.amount, 0);
    setTotalExpense(total);
    setAvgExpense(filtered.length ? (total / filtered.length).toFixed(2) : 0);

    // ✅ Category-wise Expense Calculation
    const categoryMap = {};
    filtered.forEach(exp => {
      categoryMap[exp.category] = (categoryMap[exp.category] || 0) + exp.amount;
    });
    setCategoryStats(categoryMap);

    // ✅ Best & Worst Spending Categories
    const categories = Object.keys(categoryMap);
    if (categories.length) {
      setBestCategory(categories.reduce((a, b) => (categoryMap[a] > categoryMap[b] ? a : b)));
      setWorstCategory(categories.reduce((a, b) => (categoryMap[a] < categoryMap[b] ? a : b)));
    }
  }, [month, minAmount, maxAmount, category, expenses]);

  return (
    <div className="bg-white shadow-lg p-6 rounded-xl border border-gray-200 max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-gray-700 text-center">📊 Expense Analytics</h2>

      {/* Filters Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 bg-gray-100 p-4 rounded-lg shadow">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Month</label>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Min Amount</label>
          <input
            type="number"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Max Amount</label>
          <input
            type="number"
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        {/* ✅ Category Filter */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full bg-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="Food">🍕 Food</option>
            <option value="Transport">🚕 Transport</option>
            <option value="Shopping">🛍️ Shopping</option>
            <option value="Entertainment">🎬 Entertainment</option>
            <option value="Healthcare">💊 Healthcare</option>
            <option value="Other">🔹 Other</option>
          </select>
        </div>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center mb-6">
        <div className="p-4 bg-blue-100 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Expense</h3>
          <p className="text-xl font-bold text-blue-700">₹{totalExpense}</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Avg Expense</h3>
          <p className="text-xl font-bold text-green-700">₹{avgExpense}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold text-center mb-4">Category-wise Distribution</h3>
          <Pie data={{
            labels: Object.keys(categoryStats),
            datasets: [{
              data: Object.values(categoryStats),
              backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4caf50", "#f57c00"]
            }]
          }} />
        </div>

        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold text-center mb-4">Expense by Category</h3>
          <Bar data={{
            labels: Object.keys(categoryStats),
            datasets: [{
              label: "Expense",
              data: Object.values(categoryStats),
              backgroundColor: "#3b82f6"
            }]
          }} />
        </div>
      </div>

      {/* Expense Table */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Expense List</h3>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm shadow-md rounded-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Note</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map(exp => (
                <tr key={exp.id} className="border-t border-gray-300 hover:bg-blue-50 transition duration-200">
                  <td className="p-3">{exp.date}</td>
                  <td className="p-3">{exp.category}</td>
                  <td className="p-3 font-semibold text-blue-700">₹{exp.amount}</td>
                  <td className="p-3">{exp.description || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
