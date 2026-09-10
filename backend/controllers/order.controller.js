const Order = require('../models/order.model');
const OrderItem = require('../models/orderItem.model');
const Product = require('../models/product.model');
const Customer = require('../models/customer.model');

// Create order
const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, customerInfo } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items in order' });
    }

    const customer = await Customer.findOne({ user: req.user.id });
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    // First pass: validate every item (no changes saved yet)
    const validatedItems = [];
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }

      const quantity = Number(item.quantity) || 0;
      if (quantity <= 0) {
        return res.status(400).json({ success: false, message: `Invalid quantity for ${product.name}` });
      }

      if (product.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: product.stock === 0
            ? `${product.name} is out of stock`
            : `Only ${product.stock} left in stock for ${product.name}`,
        });
      }

      const price = product.salePrice || product.price;
      const totalPrice = price * quantity;
      validatedItems.push({ product, quantity, price, totalPrice });
    }

    // Second pass: everything validated, now actually create items and adjust stock
    let totalAmount = 0;
    const orderItems = [];

    for (const { product, quantity, price, totalPrice } of validatedItems) {
      totalAmount += totalPrice;

      const orderItem = await OrderItem.create({
        product: product._id,
        quantity,
        price,
        totalPrice
      });

      orderItems.push(orderItem._id);
      product.stock -= quantity;
      await product.save();
    }

    const order = await Order.create({
      customer: customer._id,
      user: req.user.id,
      items: orderItems,
      totalAmount,
      shippingAddress,
      customerInfo
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get my orders
const getMyOrders = async (req, res) => {
  try {
    const customer = await Customer.findOne({ user: req.user.id });
    const orders = await Order.find({ customer: customer._id })
      .populate('items');
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all orders (Admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items');
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update order status (Admin)
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    order.status = req.body.status;
    await order.save();
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
};