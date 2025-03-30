📌 Expense Tracker - MERN Stack
A full-stack Expense Tracker application built using the MERN (MongoDB, Express.js, React, Node.js) stack. It allows users to add, edit, delete, and categorize expenses, with data visualization features.

🚀 Features
✅ Add, edit, and delete expenses
✅ Categorize expenses (Food, Transport, Shopping, etc.)
✅ Data validation (prevents negative amounts)
✅ Responsive UI with ShadCN/UI components
✅ Uses MongoDB for data storage
✅ API developed with Node.js and Express.js
✅ Context API for state management
✅ Live updates on the UI

🛠️ Tech Stack
Frontend: React, Vite, TailwindCSS, ShadCN/UI

Backend: Node.js, Express.js, MongoDB

Database: MongoDB (Mongoose ORM)

State Management: Context API

Icons: Lucide React


🖥️ Installation & Setup
1️⃣ Clone the Repository
sh
Copy
Edit
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
2️⃣ Install Dependencies
Frontend
sh
Copy
Edit
cd expense-tracker-frontend
npm install
Backend
sh
Copy
Edit
cd ../expense-tracker-backend
npm install
3️⃣ Setup Environment Variables
Create a .env file inside expense-tracker-backend/ and add:

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
PORT=5000
🚀 Run the Project
1️⃣ Start Backend
sh
Copy
Edit
cd expense-tracker-backend
npm start
2️⃣ Start Frontend
sh
Copy
Edit
cd ../expense-tracker-frontend
npm run dev
Now, open http://localhost:5173/ in your browser! 🎉

📡 API Endpoints
Method	Endpoint	Description
POST	/api/expenses	Add a new expense
GET	/api/expenses	Get all expenses
PUT	/api/expenses/:id	Edit an expense
DELETE	/api/expenses/:id	Delete an expense
📸 Screenshots
🚀 Coming soon!

💡 Future Improvements
🔹 Add authentication (Login/Signup)
🔹 Monthly spending report
🔹 Charts for better expense tracking

📜 License
This project is open-source under the MIT License.
