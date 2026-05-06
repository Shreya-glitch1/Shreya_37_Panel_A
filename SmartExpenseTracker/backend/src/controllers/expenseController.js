import Expense from '../models/Expense.js';

export const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date, description } = req.body;
    
    const expense = new Expense({
      userId: req.userId,
      title,
      amount,
      category,
      date,
      description
    });
    
    await expense.save();
    res.status(201).json({ message: 'Expense added successfully', expense });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.userId }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    
    if (expense.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateExpense = async (req, res) => {
  try {
    let expense = await Expense.findById(req.params.id);
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    
    if (expense.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    expense = await Expense.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    
    res.json({ message: 'Expense updated successfully', expense });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    
    if (expense.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    await Expense.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
