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
    default: Date.now()
  },
  userId: {
    type: Schema.Types.ObjectId, // same as _id
    required: true
  }
});

const Expense = model('Expense', expenseSchema);

module.exports = Expense;
