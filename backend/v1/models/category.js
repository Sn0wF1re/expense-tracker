const { model, Schema } = require('mongoose');

const categorySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
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

categorySchema.pre('save', async function (next) {
    const category = this;
    const existingCategory = await Category.findOne({userId: category.userId, name: category.name});
    if (existingCategory) {
        const error = new Error(`Category already exists`);
        return next(error);
    }
    next();
});

const Category = model('Category', categorySchema);
module.exports = Category;