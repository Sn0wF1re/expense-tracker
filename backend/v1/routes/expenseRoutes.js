const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// create expense
router.post('/', expenseController.createExpense);

// Get all expenses
router.get('/', expenseController.getExpenses);

// Get one expense
router.get('/:id', expenseController.getExpense);

// update an expense
router.put('/:id', expenseController.updateExpense);

// delete an expense
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
