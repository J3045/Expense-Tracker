import ExpenseForm from "../components/ExpenseForm";

function AddExpense() {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-8">
      <div className="bg-white shadow-lg p-10 rounded-xl border border-gray-200 w-full max-w-3xl">
        <ExpenseForm />
      </div>
    </div>
  );
}

export default AddExpense;
