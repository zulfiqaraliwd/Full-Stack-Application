const express = require('express');
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/product.controller');
const { protect } = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

const router = express.Router();

// Public
router.get('/', getProducts);
router.get('/:id', getProduct);

// Admin only
router.post('/', protect, roleCheck('admin'), createProduct);
router.put('/:id', protect, roleCheck('admin'), updateProduct);
router.delete('/:id', protect, roleCheck('admin'), deleteProduct);

module.exports = router;