const Category = require('../models/category');

// create category
const createCategory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const newCategory = await Category.create({
      userId,
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
    const userId = req.user.id;
    const categories = await Category.find({ userId });
    res.json(categories);
  } catch(err) {
    next(err);
  }
};

// get one category
const getCategory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const categoryId = req.params.id;
    const category = await Category.findOne({
      userId,
      _id: categoryId
    });
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
    const userId = req.user.id;
    const categoryId = req.params.id;
    const update = {
      name: req.body.name,
    }
    const category = await Category.findOneAndUpdate(
      {
        userId,
        _id: categoryId,
      },
      update,
      { new: true }
    );
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
    const userId = req.user.id;
    const categoryId = req.params.id;

    const category = await Category.findOneAndDelete({
      userId,
      _id: categoryId
    });
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