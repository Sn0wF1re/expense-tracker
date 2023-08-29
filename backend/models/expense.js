const {Schema, model} = require('mongoose');

const expenseSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Expense = model('Expense', expenseSchema);

module.exports = Expense;
