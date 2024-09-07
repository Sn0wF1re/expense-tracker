const {Model, Schema} = require('mongoose');

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

const category = Model('Category', categorySchema);
module.exports = category;