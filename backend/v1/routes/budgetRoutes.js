const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');

// create budget
router.post('/', budgetController.createBudget);

// Get all budgets
router.get('/', budgetController.getBudgets);

// Get one budget
router.get('/:month', budgetController.getBudget);

// update a budget
router.put('/:id', budgetController.updateBudget);

// delete a budget
router.delete('/:id', budgetController.deleteBudget);

module.exports = router;