const Expense = require('../models/expense');

// create expense
const createExpense = async (req, res, next) => {
  try {
    const user = req.user;
    console.log('user: ', req.user);
    const newExpense = await Expense.create({
      userId: user.id,
      description: req.body.description,
      amount: req.body.amount,
      category: req.body.category,
    });
    res.json(newExpense);
  } catch(err) {
    next(err);
  }
};

// get all expenses
const getExpenses = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const expenses = await Expense.find({ userId });
    res.json(expenses);
  } catch(err) {
    next(err);
  }
};

// get one expense
const getExpense = async (req, res, next) => {
  try {
    const user = req.user;
    const expenseId = req.params.id;
    const expense = await Expense.findOne({ userId: user.id, _id: expenseId });
    if (expense) {
      res.json(expense)
    } else {
      res.status(404).json({ message: 'Expense not found!' })
    }
  } catch(err) {
    next(err);
  }
};

// update an expense
const updateExpense = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const expenseId = req.params.id;
    const update = {
      description: req.body.description,
      amount: req.body.amount,
      category: req.body.category
    }
    const expense = await Expense.findOneAndUpdate({
      userId,
      _id: expenseId
    },
    update,
    { new: true });

    if (!expense) {
      res.status(404).json({ message: 'Expense not found' });
    } else {
      res.json(expense);
    }
  } catch(err) {
    next(err);
  }
};

// delete an expense
const deleteExpense = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const expenseId = req.params.id;
    const deletedExpense = await Expense.findOneAndDelete({ userId, expenseId });
    if (!deletedExpense) {
      res.status(404).json({ message: 'Expense not found' });
    } else {
      res.json(deletedExpense);
    }
  } catch(err) {
    next(err);
  }
};

module.exports = {
  createExpense,
  getExpenses,
  getExpense,
  updateExpense,
  deleteExpense
};