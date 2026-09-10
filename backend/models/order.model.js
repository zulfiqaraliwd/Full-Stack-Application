const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderNumber: String,
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem' }],
  totalAmount: Number,
  status: { type: String, default: 'pending' },
  shippingAddress: {
    street: String,
    city: String,
    country: String
  },
  customerInfo: {
    name: String,
    email: String,
    phone: String
  }
}, { timestamps: true });

OrderSchema.pre('save', function() {
  if (!this.orderNumber) {
    this.orderNumber = 'ORD-' + Date.now();
  }
});

module.exports = mongoose.model('Order', OrderSchema);