import React, { useState, useEffect } from 'react';
import { getExpenses, deleteExpense, addExpense } from '../services/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newExpense, setNewExpense] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await getExpenses();
      setExpenses(response.data);
    } catch (err) {
      console.error('Failed to fetch expenses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    
    try {
      await addExpense(newExpense);
      setExpenses([...expenses, newExpense]);
      setNewExpense({
        title: '',
        amount: '',
        category: 'Food',
        date: new Date().toISOString().split('T')[0],
        description: ''
      });
      setShowForm(false);
      fetchExpenses();
    } catch (err) {
      console.error('Failed to add expense:', err);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses(expenses.filter(e => e._id !== id));
    } catch (err) {
      console.error('Failed to delete expense:', err);
    }
  };

  const filteredExpenses = filterCategory === 'All' 
    ? expenses 
    : expenses.filter(e => e.category === filterCategory);

  const totalSpent = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard-container">
      <h1>Personal Finance Manager</h1>
      
      <div className="dashboard-header">
        <div className="total-spent">
          <h3>Total Spent</h3>
          <p className="amount">₹{totalSpent.toFixed(2)}</p>
        </div>
        
        <button 
          className="btn-add-expense"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add Expense'}
        </button>
      </div>

      {showForm && (
        <form className="expense-form" onSubmit={handleAddExpense}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={newExpense.title}
              onChange={(e) => setNewExpense({...newExpense, title: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Category</label>
            <select
              value={newExpense.category}
              onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
            >
              <option>Food</option>
              <option>Transport</option>
              <option>Shopping</option>
              <option>Bills</option>
              <option>Entertainment</option>
              <option>Health</option>
              <option>Other</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={newExpense.date}
              onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={newExpense.description}
              onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
            />
          </div>
          
          <button type="submit">Add Expense</button>
        </form>
      )}

      <div className="filter-section">
        <label>Filter by Category:</label>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option>All</option>
          <option>Food</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Bills</option>
          <option>Entertainment</option>
          <option>Health</option>
          <option>Other</option>
        </select>
      </div>

      <div className="expenses-list">
        <h2>Recent Expenses</h2>
        {filteredExpenses.length === 0 ? (
          <p>No expenses found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense) => (
                <tr key={expense._id}>
                  <td>{expense.title}</td>
                  <td>{expense.category}</td>
                  <td>₹{expense.amount}</td>
                  <td>{new Date(expense.date).toLocaleDateString()}</td>
                  <td>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDeleteExpense(expense._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
