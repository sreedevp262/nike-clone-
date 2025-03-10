const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true, // Remove extra spaces
    maxlength: [100, 'Product name cannot exceed 100 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Product price cannot be negative'],
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [500, 'Product description cannot exceed 500 characters'],
  },
  image: {
    type: String,
    required: [true, 'Product image is required'],
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: ['shoes', 'clothing', 'accessories'], // Example categories
  },
  stock: {
    type: Number,
    required: [true, 'Product stock is required'],
    min: [0, 'Product stock cannot be negative'],
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be negative'],
    max: [5, 'Rating cannot exceed 5'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexing for frequently queried fields
productSchema.index({ name: 'text', category: 1 });

module.exports = mongoose.model('Product', productSchema);