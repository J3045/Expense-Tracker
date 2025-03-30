import { useEffect, useContext, useState } from "react"; 
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Overview from "./Overview";
import AddExpense from "./AddExpense";
import Analytics from "./Analytics";
import { ExpenseContext } from "../context/ExpenseContext";
import { Menu } from "lucide-react"; // For mobile menu icon
import { toast } from "react-hot-toast"; // Toast for notifications

function Dashboard() {
  const navigate = useNavigate();
  const { fetchExpenses } = useContext(ExpenseContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      fetchExpenses();
      toast.success("📊 Expenses data loaded successfully!");
    }
  }, [navigate, fetchExpenses]);

  return (
    <div className="flex h-screen">
      {/* Mobile Sidebar Toggle Button */}
      <button
        className="absolute top-4 left-4 md:hidden bg-gray-900 text-white p-2 rounded"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 md:ml-64">
        <Routes>
          <Route index element={<Overview />} />
          <Route path="add-expense" element={<AddExpense />} />
          <Route path="analytics" element={<Analytics />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
