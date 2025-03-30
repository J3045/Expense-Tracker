import { useNavigate, useLocation } from "react-router-dom";
import { Home, PlusCircle, BarChart3, LogOut, X } from "lucide-react"; 

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const menuItems = [
    { name: "Overview", path: "/dashboard", icon: <Home size={20} /> },
    { name: "Add Expense", path: "/dashboard/add-expense", icon: <PlusCircle size={20} /> },
    { name: "Analytics", path: "/dashboard/analytics", icon: <BarChart3 size={20} /> },
  ];

  return (
    <>
      {/* Sidebar for Large Screens */}
      <div className="hidden md:flex w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 flex-col p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="flex flex-col gap-4 flex-grow">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300
                ${location.pathname === item.path ? "bg-gray-700" : "hover:bg-gray-800"}`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition-all duration-300 mt-auto"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      {/* Sidebar for Small Screens */}
      <div
        className={`fixed inset-0 bg-gray-900 text-white w-64 h-screen p-6 shadow-lg flex flex-col transform transition-transform duration-300 md:hidden
          ${sidebarOpen ? "translate-x-0" : "-translate-x-64"}`}
      >
        {/* Close Button */}
        <button className="absolute top-4 right-4" onClick={() => setSidebarOpen(false)}>
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="flex flex-col gap-4 flex-grow">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300
                ${location.pathname === item.path ? "bg-gray-700" : "hover:bg-gray-800"}`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition-all duration-300 mt-auto"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </>
  );
}

export default Sidebar;
