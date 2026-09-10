const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: String,
  type: { type: String,
     enum: ['perfume', 'clothing']
     },
  gender: { type: String, 
    enum: ['men', 'women', 'unisex', 'none'], 
    default: 'none' },
  status: { type: String, default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);