const Budget = require('../models/budget');

// create budget
const createBudget = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const newBudget = await Budget.create({
      userId,
      budget: req.body.budget,
    });
    res.json(newBudget);
  } catch(err) {
    next(err);
  }
};

// get all budgets
const getBudgets = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const budgets = await Budget.find({ userId });
    if (!budgets) {
      res.status(404).json({ message: 'Budgets not found!' });
    }
    res.json(budgets);
  } catch(err) {
    next(err);
  }
};

// get one budget
const getBudget = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const budgetId = req.params.id;
    const budget = await Budget.findOne({
      userId,
      _id: budgetId
    });
    if (budget) {
      res.json(budget)
    } else {
      res.status(404).json({ message: 'Budget not found!' })
    }
  } catch(err) {
    next(err);
  }
};

// update a budget
const updateBudget = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const budgetId = req.params.id;
    const update = {
      budget: req.body.budget,
    }
    const budget = await Budget.findOneAndUpdate(
      {
        userId,
        _id: budgetId,
      },
      update,
      { new: true }
    );
    if (budget) {
      res.json(budget);
    } else {
      res.status(404).json({ message: 'Budget not found!' });
    }
  } catch(err) {
    next(err);
  }
};

// delete a budget
const deleteBudget = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const budgetId = req.params.id;
    const budget = await Budget.findOneAndDelete({
      userId,
      _id: budgetId
    });
    if (budget) {
      res.json(budget);
    } else {
      res.status(404).json({ message: 'Budget not found!' });
    }
  } catch(err) {
    next(err);
  }
};

module.exports = {
    createBudget,
    getBudgets,
    getBudget,
    updateBudget,
    deleteBudget
};