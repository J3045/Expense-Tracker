# 💰 Expense Tracker with Monthly Analysis  

A full-stack **Expense Tracker** that allows users to log expenses, view a summary of total spending, and analyze expenses using monthly category-wise breakdowns.  

## ✨ Features  
- 📌 Add, Edit, Delete Expenses  
- 📆 Filter expenses by month and category  
- 📊 Monthly summary visualization using Chart.js  
- 🎨 Responsive UI with Tailwind CSS  
- 🌎 Global state management using Context API  
- ⚡ Optimized MongoDB queries with indexes  
- ✅ Data validation to prevent invalid expenses  
- 🔐 Basic authentication (Email & Password) for user tracking  
- 📥 Generate JSON report for monthly expenses (`GET /export?month=YYYY-MM`)  

## 🚀 Tech Stack  
**Frontend:** React.js, Context API, Tailwind CSS, Chart.js  
**Backend:** Node.js, Express.js, MongoDB (Mongoose ORM)  

## 📌 API Endpoints  
- **POST /expenses** → Add an expense  
- **GET /expenses?month=YYYY-MM** → Fetch expenses for a given month  
- **PUT /expenses/:id** → Update an expense  
- **DELETE /expenses/:id** → Delete an expense  
- **GET /summary?month=YYYY-MM** → Get category-wise total expenses  
- **GET /export?month=YYYY-MM** → Generate a JSON report for monthly expenses  

## 📌 Future Enhancements  
- 📌 Implement Pagination for expense history  
- 📌 CSV Export Feature for better data accessibility  

---

🎯 **Developed by:** Jainikkumar Patel  
