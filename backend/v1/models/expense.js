const {Schema, model} = require('mongoose');

const expenseSchema = new Schema({
  userId : {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
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
  },
  budget: {
    type: Schema.Types.ObjectId,
    ref: 'Budget',
  },
});

const Expense = model('Expense', expenseSchema);

module.exports = Expense;
