const {Model, Schema} = require('mongoose');

const budgetSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    budget: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    month: {
        type: String,
        required: true
    },
    expenses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Expense'
        }
    ],
});

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

budgetSchema.pre('save', async function (next) {
    const budget = this;
    const month = monthNames[new Date().getMonth()];

    const existingBudget = await Budget.findOne({userId: budget.userId, month: month});

    if (existingBudget) {
        const error = new Error(`Budget already exists for ${month}`);
        return next(error);
    }

    budget.month = month;
    next();
});

const Budget = Model('Budget', budgetSchema);
module.exports = Budget;