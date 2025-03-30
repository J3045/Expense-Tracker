import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const generateColors = (count) =>
  Array.from({ length: count }, (_, i) =>
    `hsl(${(i * 137) % 360}, 70%, 50%)`
  );

function ExpenseChart() {
  const { expenses } = useContext(ExpenseContext);

  if (expenses.length === 0) {
    return (
      <p className="text-center text-gray-500 text-lg mt-4">
        कोई खर्चा दर्ज नहीं किया गया है।
      </p>
    );
  }

  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  const categories = Object.keys(categoryTotals);
  const values = Object.values(categoryTotals);
  const colors = generateColors(categories.length);
  const totalAmount = values.reduce((sum, value) => sum + value, 0);

  return (
    <div className="bg-white shadow-lg rounded-lg p-5 sm:p-6 border border-gray-300 mx-auto max-w-2xl w-full">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-700 text-center mb-4">
        📊 Expense Summary
      </h2>
      
      {/* Chart Wrapper with Balanced Spacing */}
      <div className="flex justify-center">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-[280px] sm:h-[320px] md:h-[380px] lg:h-[400px] flex items-center">
          <Pie
            data={{
              labels: categories,
              datasets: [
                {
                  data: values,
                  backgroundColor: colors,
                  borderWidth: 2,
                  hoverOffset: 8,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              responsive: true,
              plugins: {
                legend: {
                  position: "bottom",
                  labels: {
                    font: { size: 13, weight: "bold" },
                  },
                },
                tooltip: {
                  callbacks: {
                    label: function (tooltipItem) {
                      const value = tooltipItem.raw;
                      const percentage = ((value / totalAmount) * 100).toFixed(1);
                      return ` ${tooltipItem.label}: ₹${value.toLocaleString("en-IN")} (${percentage}%)`;
                    },
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ExpenseChart;
