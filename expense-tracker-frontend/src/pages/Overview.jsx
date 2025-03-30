import SummaryCards from "../components/SummaryCards";
import ExpenseList from "../components/ExpenseList";
import ExpenseChart from "../components/ExpenseChart";

function Overview() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Expense Tracker</h1>
      <SummaryCards />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <ExpenseList />
        <ExpenseChart />
      </div>
    </div>
  );
}

export default Overview;
