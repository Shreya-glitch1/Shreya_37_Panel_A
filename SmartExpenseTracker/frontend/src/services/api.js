import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (name, email, password) =>
  api.post('/users/register', { name, email, password });

export const loginUser = (email, password) =>
  api.post('/users/login', { email, password });

export const addExpense = (expense) =>
  api.post('/expenses', expense);

export const getExpenses = () =>
  api.get('/expenses');

export const updateExpense = (id, expense) =>
  api.put(`/expenses/${id}`, expense);

export const deleteExpense = (id) =>
  api.delete(`/expenses/${id}`);

export const setBudget = (budget) =>
  api.post('/budgets', budget);

export const getBudgets = () =>
  api.get('/budgets');

export const getBudgetAnalysis = (month, year) =>
  api.get(`/budgets/analysis/${month}/${year}`);

export const deleteBudget = (id) =>
  API.delete(`/api/budgets/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

export default api;
