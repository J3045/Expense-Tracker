import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ExpenseProvider } from "./context/ExpenseContext";  
import LoginPage from "./pages/login";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <ExpenseProvider>  
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </Router>
    </ExpenseProvider>
  );
}

export default App;
