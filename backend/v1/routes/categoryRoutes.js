const router = require('express').Router();
const categoryController = require('../controllers/categoryController');

// create category
router.post('/', categoryController.createCategory);

// Get all categories
router.get('/', categoryController.getCategories);

// Get one category
router.get('/:id', categoryController.getCategory);

// update a category
router.put('/:id', categoryController.updateCategory);

// delete a category
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;