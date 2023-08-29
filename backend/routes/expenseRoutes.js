const express = require('express');
const router = express.Router();

const Expense = require('../models/expense');

// create expense
router.post('/', async (req, res, next) => {
  try {
    const newExpense = await Expense.create({
      description: req.body.description,
      amount: req.body.amount,
      category: req.body.category,
    });
    res.json(newExpense);
  } catch(err) {
    next(err);
  }
});

// Get all expenses
router.get('/', async (req, res, next) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch(err) {
    next(err);
  }
});

// Get one expense
router.get('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    const expense = await Expense.findById(userId);
    if (expense) {
      res.json(expense)
    } else {
      res.status(404).json({ message: 'Expense not found!' })
    }
  } catch(err) {
    next(err);
  }
});

// update an expense
router.put('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    const expense = await Expense.findByIdAndUpdate(
      userId,
      {
        description: req.body.description,
        amount: req.body.amount,
        category: req.body.category
      },
      { new: true }
    )
    if (!expense) {
      res.status(404).json({ message: 'Expense not found' });
    } else {
      res.json(expense);
    }
  } catch(err) {
    next(err);
  }
});

// delete an expense
router.delete('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    const deletedExpense = await Expense.findByIdAndDelete(userId);
    if (!deletedExpense) {
      res.status(404).json({ message: 'Expense not found' });
    } else {
      res.json(deletedExpense);
    }
  } catch(err) {
    next(err);
  }
});

module.exports = router;
