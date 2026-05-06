import React, { useState, useEffect } from 'react';
import { getBudgets, getBudgetAnalysis, setBudget, deleteBudget } from '../services/api';
import '../styles/Budget.css';

const Budget = () => {

  const [budgets, setBudgetsState] = useState([]);
  const [analysis, setAnalysis] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const [newBudget, setNewBudget] = useState({
    category: 'Food',
    limit: '',
    month: (new Date().getMonth() + 1),
    year: new Date().getFullYear()
  });

  useEffect(() => {
    fetchBudgets();
    fetchAnalysis();
  }, [currentMonth, currentYear]);

  const fetchBudgets = async () => {
    try {
      const response = await getBudgets();
      setBudgetsState(response.data);
    } catch (err) {
      console.error('Failed to fetch budgets:', err);
    }
  };

  const fetchAnalysis = async () => {
    try {
      const response = await getBudgetAnalysis(currentMonth, currentYear);
      setAnalysis(response.data || []);
    } catch (err) {
      console.error('Failed to fetch analysis:', err);
    }
  };

  const handleSetBudget = async (e) => {
    e.preventDefault();

    try {

      await setBudget(newBudget);

      setShowForm(false);

      setNewBudget({
        category: 'Food',
        limit: '',
        month: currentMonth,
        year: currentYear
      });

      fetchBudgets();
      fetchAnalysis();

    } catch (err) {
      console.error('Failed to set budget:', err);
    }
  };

  const handleDeleteBudget = async (id) => {
    try {

      await deleteBudget(id);

      fetchBudgets();
      fetchAnalysis();

    } catch (err) {
      console.error("Failed to delete budget:", err);
    }
  };

  return (

    <div className="budget-container">

      <h1>Budget Management</h1>

      <div className="budget-header">

        <div className="date-selector">

          <label>Month:</label>
          <select
            value={currentMonth}
            onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
          >
            {[1,2,3,4,5,6,7,8,9,10,11,12].map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          <label>Year:</label>
          <select
            value={currentYear}
            onChange={(e) => setCurrentYear(parseInt(e.target.value))}
          >
            {[2023,2024,2025,2026].map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

        </div>

        <button
          className="btn-add-budget"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Set Budget'}
        </button>

      </div>


      {showForm && (

        <form className="budget-form" onSubmit={handleSetBudget}>

          <div className="form-group">

            <label>Category</label>

            <select
              value={newBudget.category}
              onChange={(e) =>
                setNewBudget({...newBudget, category: e.target.value})
              }
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

            <label>Budget Limit</label>

            <input
              type="number"
              value={newBudget.limit}
              onChange={(e) =>
                setNewBudget({...newBudget, limit: e.target.value})
              }
              required
            />

          </div>

          <button type="submit">
            Set Budget
          </button>

        </form>

      )}


      <div className="budget-analysis">

        <h2>Budget Analysis</h2>

        {analysis.length === 0 ? (

          <p>No budgets set for this month</p>

        ) : (

          <div className="analysis-cards">

            {analysis.map((item, index) => {

              const spent = Number(item.spent || 0);
              const remaining = Number(item.remaining || 0);
              const percentage = Number(item.percentage || 0);

              return (

                <div key={item._id || index} className="analysis-card">

                  <h3>{item.category}</h3>

                  <div className="budget-info">

                    <p>Limit: ₹{item.limit}</p>
                    <p>Spent: ₹{spent.toFixed(2)}</p>
                    <p>Remaining: ₹{remaining.toFixed(2)}</p>

                  </div>

                  <div className="progress-bar">

                    <div
                      className={`progress ${percentage > 100 ? 'exceeded' : ''}`}
                      style={{ width: `${Math.min(percentage,100)}%` }}
                    >
                      {percentage}%
                    </div>

                  </div>

                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteBudget(item._id)}
                  >
                    Remove
                  </button>

                </div>

              )

            })}

          </div>

        )}

      </div>

    </div>

  );
};

export default Budget;