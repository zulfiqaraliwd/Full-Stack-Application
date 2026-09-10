const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
  price: Number,
  totalPrice: Number
}, { timestamps: true });

module.exports = mongoose.model('OrderItem', OrderItemSchema);