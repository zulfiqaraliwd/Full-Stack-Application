const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },

  phone: {
    type: String,
    trim: true,
  },

  address: {
    street: String,
    city: String,
    country: String,
    zipCode: String,
  },
}, {
  timestamps: true,
});

module.exports =
  mongoose.models.customer ||
  mongoose.model("customer", CustomerSchema);