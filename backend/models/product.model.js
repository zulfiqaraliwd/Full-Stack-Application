const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  salePrice: {
    type: Number,
    min: 0,
    default: null
  },
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  
  category: {
    type: String,  
    required: [true, 'Category is required'],
    enum: ['perfume', 'clothing', 'accessories', 'fragrance', 'beauty', 'fashion'],
    default: 'perfume'
  },
  productType: {
    type: String,
    enum: ['perfume', 'clothing'],
    default: 'perfume'
  },
  gender: {
    type: String,
    enum: ['men', 'women', 'unisex'],
    default: 'men'
  },
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  
  fragranceCategory: {
    type: String,
    enum: ['floral', 'woody', 'oriental', 'fresh', 'citrus', 'aromatic', 'aquatic', 'bold', ''],
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

//  timestamp
productSchema.pre('save', function() {
  this.updatedAt = Date.now();
});

module.exports = mongoose.model('Product', productSchema);