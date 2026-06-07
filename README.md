# 💰 Expense Tracker

A full-stack Expense Tracker application built using the MERN Stack (MongoDB, Express.js, React.js, and Node.js). The application helps users manage their finances by tracking income and expenses, maintaining transaction history, and calculating the remaining balance in real time.

---

## 🌐 Live Demo

### 🚀 Live Application:

https://expense-tracker-mh9i.vercel.app

⚠️ **Important:** The backend is hosted on Vercel's free serverless tier. The first request after a period of inactivity may take a few seconds to load due to a cold start. Please allow a moment for the application to initialize.

---

## 📌 Overview

Expense Tracker is designed to simplify personal finance management by allowing users to record transactions, monitor their spending habits, and keep track of their overall financial status.

The application provides a clean and intuitive interface for managing transactions while maintaining accurate records of income, expenses, and available balance.

---

## 🎬 Project Demo

[Add GIF Demo Here]

---

## 🎯 Key Features

- Add and delete transactions
- Track income and expenses
- Real-time balance calculation
- Transaction history with pagination
- Responsive UI using Tailwind CSS and Shadcn UI
- REST API integration
- MongoDB Atlas database integration
- Full-stack MERN architecture

---

## 📸 Screenshots & User Walkthrough

### Step 1: Open the Application

[Add Screenshot Here]

Description:
The user lands on the application's homepage/dashboard where financial information and transaction data are displayed.

---

### Step 2: Add a New Transaction

[Add Screenshot Here]

Description:
Users can enter transaction details such as amount, type, category, and description to create a new transaction.

---

### Step 3: View Transaction History

[Add Screenshot Here]

Description:
All transactions are displayed in a structured format, allowing users to review their financial activities.

---

### Step 4: Delete a Transaction

[Add Screenshot Here]

Description:
Users can remove transactions that are no longer needed or were entered incorrectly.

---

### Step 5: Monitor Financial Summary

[Add Screenshot Here]

Description:
The application automatically calculates and displays total income, total expenses, and remaining balance.

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- JavaScript (ES6+)
- Tailwind CSS
- Shadcn UI
- HTML5
- CSS3

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose

### Deployment

- Vercel

---

## 📦 Libraries & Dependencies

### Frontend Dependencies

- react
- shadcn/ui
- tailwindcss

### Backend Dependencies

- express
- mongoose
- cors
- dotenv

---

## 📂 Project Structure

```plaintext
Expense-Tracker/
│
├── Backend/
│   ├── controllers/          # Business logic
│   ├── models/               # Mongoose schemas
│   ├── routers/              # API routes
│   ├── index.js              # Express server
│   └── vercel.json           # Vercel backend config
│
├── Frontend/
│   ├── src/
│   │   ├── Components/       # Reusable UI components
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── .gitignore
```

---

## ⚙️ Installation & Execution

### Clone Repository

```bash
git clone https://github.com/AwaizSayed/Expense-Tracker.git
```

### Backend Setup

```bash
cd Backend
npm install
npm start
```

### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

### Environment Variables

Backend `.env`

```env
MONGO_URL=
PORT=
```

Frontend `.env`

```env
VITE_BACKEND_URL=
```

---

## 👨‍💻 Author

**Awaiz Sayed**

GitHub: https://github.com/AwaizSayed
