import React, { useState, useEffect } from 'react';
import { getExpenses } from '../services/api';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import '../styles/Analytics.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Analytics = () => {
  const [expenses, setExpenses] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await getExpenses();
      setExpenses(response.data);
      generateCharts(response.data);
    } catch (err) {
      console.error('Failed to fetch expenses:', err);
    }
  };

  const generateCharts = (data) => {
    // Category-wise pie chart
    const categoryTotals = {};
    data.forEach(expense => {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
    });

    setChartData({
      labels: Object.keys(categoryTotals),
      datasets: [
        {
          label: 'Expenses by Category',
          data: Object.values(categoryTotals),
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384'
          ],
          borderColor: '#fff',
          borderWidth: 2
        }
      ]
    });

    // Monthly bar chart
    const monthlyTotals = {};
    data.forEach(expense => {
      const date = new Date(expense.date);
      const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      monthlyTotals[monthKey] = (monthlyTotals[monthKey] || 0) + expense.amount;
    });

    const sortedMonths = Object.keys(monthlyTotals).sort();

    setMonthlyData({
      labels: sortedMonths,
      datasets: [
        {
          label: 'Monthly Expenses',
          data: sortedMonths.map(m => monthlyTotals[m]),
          backgroundColor: '#36A2EB',
          borderColor: '#2196F3',
          borderWidth: 1
        }
      ]
    });
  };

  return (
    <div className="analytics-container">
      <h1>Analytics & Insights</h1>
      
      <div className="analytics-charts">
        {chartData && (
          <div className="chart-box">
            <h2>Expenses by Category</h2>
            <Pie data={chartData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
          </div>
        )}
        
        {monthlyData && (
          <div className="chart-box">
            <h2>Monthly Spending Trend</h2>
            <Bar data={monthlyData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
          </div>
        )}
      </div>

      <div className="summary-stats">
        <h2>Summary Statistics</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Expenses</h3>
            <p className="stat-value">₹{expenses.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}</p>
          </div>
          
          <div className="stat-card">
            <h3>Average Expense</h3>
            <p className="stat-value">₹{(expenses.reduce((sum, e) => sum + e.amount, 0) / expenses.length).toFixed(2)}</p>
          </div>
          
          <div className="stat-card">
            <h3>Total Transactions</h3>
            <p className="stat-value">{expenses.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
