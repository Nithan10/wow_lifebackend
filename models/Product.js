const mongoose = require('mongoose');

const specSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true }
}, { _id: false }); // Prevents mongoose from creating an ID for each sub-document

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true
  },
  brand: {
    type: String,
    required: [true, 'Brand name is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Selling price is required'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    required: [true, 'Original MRP is required'],
    min: [0, 'Original price cannot be negative']
  },
  badge: {
    type: String,
    trim: true,
    default: ''
  },
  type: {
    type: String,
    required: [true, 'Product type is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  availability: {
    type: String,
    required: [true, 'Availability status is required'],
    enum: ['In Stock', 'Out Of Stock'],
    default: 'In Stock'
  },
  totalStock: {
    type: Number,
    required: [true, 'Total stock is required'],
    default: 0,
    min: [0, 'Stock cannot be negative']
  },
  images: [{
    type: String,
    required: [true, 'At least one product image URL is required']
  }],
  description: {
    type: String,
    default: ''
  },
  // --- Extended Details ---
  aboutFeatures: [{
    type: String
  }],
  aboutDescription: {
    type: String,
    default: ''
  },
  specifications: [specSchema],
  idealFor: [{
    type: String
  }],
  deliveryTime: {
    type: String,
    default: '3 to 8 days'
  }
}, {
  timestamps: true // Automatically creates createdAt and updatedAt fields
});

module.exports = mongoose.model('Product', productSchema);