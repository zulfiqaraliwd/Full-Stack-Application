const express = require('express');
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
} = require('../controllers/order.controller');
const { protect } = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

const router = express.Router();

// Customer
router.post('/', protect, createOrder);
router.get('/my-orders', protect, getMyOrders);

// Admin
router.get('/', protect, roleCheck('admin'), getAllOrders);
router.put('/:id/status', protect, roleCheck('admin'), updateOrderStatus);

module.exports = router;