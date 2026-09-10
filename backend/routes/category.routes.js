const express = require('express');
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} = require('../controllers/category.controller');
const { protect } = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

const router = express.Router();

// Public
router.get('/', getCategories);

// Admin only
router.post('/', protect, roleCheck('admin'), createCategory);
router.put('/:id', protect, roleCheck('admin'), updateCategory);
router.delete('/:id', protect, roleCheck('admin'), deleteCategory);

module.exports = router;