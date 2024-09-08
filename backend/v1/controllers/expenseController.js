const Expense = require('../models/expense');
const Budget = require('../models/budget');
const Category = require('../models/category');

// create expense
const createExpense = async (req, res, next) => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  try {
    const userId = req.user.id;
    const { description, amount, category } = req.body;

    // defer saving expense object by creating an instance instead of using create method
    const newExpense = new Expense({
      userId,
      description,
      amount,
      category,
    });

    // update budget
    const budget = await Budget.findOneAndUpdate(
      { userId, month: monthNames[new Date().getMonth()] },
      { $push: { expenses: newExpense } },
      { new: true }
    );

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    // update category
    const updatedCategory = await Category.findOneAndUpdate(
      { userId, name: category },
      { $push: { expenses: newExpense } },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // save new expense
    await newExpense.save();
    res.json(newExpense);
  } catch(err) {
    next(err);
  };
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
    const userId = req.user.id;
    const expenseId = req.params.id;
    const expense = await Expense.findOne({ userId, _id: expenseId });
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
    }
    res.json(expense);
  } catch(err) {
    next(err);
  }
};

// delete an expense
const deleteExpense = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const expenseId = req.params.id;
    
    // remove expense from category
    deleteFromCategory = await Category.findOneAndUpdate(
      { userId, expenses: expenseId },
      { $pull: { expenses: expenseId } }
    );

    if (!deleteFromCategory) {
      return res.status(404).json({ message: 'Expense not found in category' });
    };
    
    // remove expense from budget
    deleteFromBudget = await Budget.findOneAndUpdate(
      { userId, expenses: expenseId },
      { $pull: { expenses: expenseId } }
    );

    if (!deleteFromBudget) {
      return res.status(404).json({ message: 'Expense not found in budget' });
    };

    // delete expense
    const deletedExpense = await Expense.findOneAndDelete({ userId, _id: expenseId });
    if (!deletedExpense) {
      res.status(404).json({ message: 'Expense not found' });
    }
    res.json(deletedExpense);
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