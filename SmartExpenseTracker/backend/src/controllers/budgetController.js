import Budget from '../models/Budget.js';
import Expense from '../models/Expense.js';

export const setBudget = async (req, res) => {
  try {
    const { category, limit, month, year } = req.body;

    let budget = await Budget.findOne({
      userId: req.userId,
      category,
      month,
      year
    });

    if (budget) {
      budget.limit = limit;
      await budget.save();
    } else {
      budget = new Budget({
        userId: req.userId,
        category,
        limit,
        month,
        year
      });

      await budget.save();
    }

    res.json({ message: "Budget set successfully", budget });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({
      userId: req.userId
    });

    res.json(budgets);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getBudgetAnalysis = async (req, res) => {
  try {

    const { month, year } = req.params;

    const monthNum = Number(month);
    const yearNum = Number(year);

    const budgets = await Budget.find({
      userId: req.userId,
      month: monthNum,
      year: yearNum
    });

    const analysis = [];

    for (const budget of budgets) {

      const spent = await Expense.aggregate([
        {
          $match: {
            userId: req.userId,
            category: budget.category,
            date: {
              $gte: new Date(yearNum, monthNum - 1, 1),
              $lt: new Date(yearNum, monthNum, 1)
            }
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$amount" }
          }
        }
      ]);

      const spentAmount = spent.length > 0 ? spent[0].total : 0;

      analysis.push({
        _id: budget._id, // important for delete
        category: budget.category,
        limit: budget.limit,
        spent: spentAmount,
        remaining: budget.limit - spentAmount,
        percentage:
          budget.limit > 0
            ? Math.round((spentAmount / budget.limit) * 100)
            : 0
      });
    }

    res.json(analysis);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteBudget = async (req, res) => {
  try {

    const { id } = req.params;

    const budget = await Budget.findOneAndDelete({
      _id: id,
      userId: req.userId
    });

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.json({ message: "Budget deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};