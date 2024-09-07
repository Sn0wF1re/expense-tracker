const Category = require('../models/category');

// create category
const createCategory = async (req, res, next) => {
  try {
    const newCategory = await Category.create({
      name: req.body.name,
    });
    res.json(newCategory);
  } catch(err) {
    next(err);
  }
};

// get all categories
const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch(err) {
    next(err);
  }
};

// get one category
const getCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (category) {
      res.json(category)
    } else {
      res.status(404).json({ message: 'Category not found!' })
    }
  } catch(err) {
    next(err);
  }
};

// update a category
const updateCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const update = {
      name: req.body.name,
    }
    const category = await Category.findByIdAndUpdate(CategoryId, update, { new: true });
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch(err) {
    next(err);
  }
};

// delete a category
const deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByIdAndDelete(categoryId);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch(err) {
    next(err);
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory
};