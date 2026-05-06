import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smart-expense-tracker')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Basic route for testing
app.get('/api/health', (req, res) => {
  res.json({ message: 'Smart Expense Tracker API is running' });
});

// Import routes
import expenseRoutes from './src/routes/expenseRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import budgetRoutes from './src/routes/budgetRoutes.js';

// Use routes
app.use('/api/expenses', expenseRoutes);
app.use('/api/users', userRoutes);
app.use('/api/budgets', budgetRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
