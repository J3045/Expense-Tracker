import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

function SummaryCards() {
  const { expenses } = useContext(ExpenseContext);

  // Calculate totals
  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);
  const monthlyExpense = expenses
    .filter(exp => new Date(exp.date).getMonth() === new Date().getMonth())
    .reduce((sum, item) => sum + item.amount, 0);
  const yearlyExpense = expenses
    .filter(exp => new Date(exp.date).getFullYear() === new Date().getFullYear())
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card title="Total Expense" amount={totalExpense} />
      <Card title="This Month" amount={monthlyExpense} />
      <Card title="This Year" amount={yearlyExpense} />
    </div>
  );
}

function Card({ title, amount }) {
  return (
    <div className="bg-white shadow p-4 rounded-lg text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">₹{amount}</p>
    </div>
  );
}

export default SummaryCards;
