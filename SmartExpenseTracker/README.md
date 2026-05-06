# Smart Expense Tracker - MERN Stack Application

A full-stack web application for tracking personal expenses, managing budgets, and gaining financial insights.

## Features

### 1. **User Authentication**
   - User registration and login
   - Secure authentication using JWT tokens
   - Password hashing with bcryptjs

### 2. **Expense Management**
   - Add, edit, and delete expenses
   - Categorize expenses (Food, Transport, Shopping, Bills, Entertainment, Health, Other)
   - View complete expense history
   - Search and filter expenses by date, category, and amount

### 3. **Budget Tracking**
   - Set monthly budgets for different categories
   - Track spending against budgets
   - Visual progress indicators
   - Budget analysis by category

### 4. **Data Visualization**
   - Pie charts showing expenses by category
   - Bar charts for monthly spending trends
   - Summary statistics and insights
   - Interactive analytics dashboard

### 5. **Report Generation**
   - Export expense data (planned feature)
   - Monthly summaries

## Tech Stack

### Frontend
- **React.js** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Chart.js** - Data visualization
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Project Structure

```
SmartExpenseTracker/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Expense.js
│   │   │   └── Budget.js
│   │   ├── controllers/
│   │   │   ├── userController.js
│   │   │   ├── expenseController.js
│   │   │   └── budgetController.js
│   │   ├── routes/
│   │   │   ├── userRoutes.js
│   │   │   ├── expenseRoutes.js
│   │   │   └── budgetRoutes.js
│   │   └── middleware/
│   │       └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Budget.jsx
│   │   │   └── Analytics.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   ├── Auth.css
│   │   │   ├── Header.css
│   │   │   ├── Dashboard.css
│   │   │   ├── Budget.css
│   │   │   └── Analytics.css
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

## Installation

### Backend Setup

1. Navigate to the backend folder:
```bash
cd SmartExpenseTracker/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB URI and JWT secret:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart-expense-tracker
JWT_SECRET=your_secret_key_here
```

5. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend folder:
```bash
cd SmartExpenseTracker/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## API Endpoints

### User Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user

### Expense Routes
- `POST /api/expenses` - Add new expense
- `GET /api/expenses` - Get all expenses
- `GET /api/expenses/:id` - Get expense by ID
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Budget Routes
- `POST /api/budgets` - Set budget
- `GET /api/budgets` - Get all budgets
- `GET /api/budgets/analysis/:month/:year` - Get budget analysis

## Future Enhancements

1. Mobile application support
2. Automated expense tracking integration
3. AI-based financial recommendations
4. Multi-user family budget management
5. Bank account integration
6. PDF report generation
7. Data export functionality

## License

ISC

## Authors

- Shreya Kalgaonkar (PRN: 1032220926)
- Ojas Jain (PRN: 1032230925)
- Atharva Bagal (PRN: 1032231107)
- Kunal Naik (PRN: 1032230933)
