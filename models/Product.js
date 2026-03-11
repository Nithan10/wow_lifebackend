const mongoose = require('mongoose');

// Prevents mongoose from creating an ID for each sub-document
const specSchema = new mongoose.Schema({
  label: { type: String, required: true, trim: true },
  value: { type: String, required: true, trim: true }
}, { _id: false }); 

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
    required: [true, 'Product type is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
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
  // Custom validation to ensure the array has at least one element
  images: {
    type: [String],
    validate: {
      validator: function(v) {
        return Array.isArray(v) && v.length > 0;
      },
      message: 'At least one product image URL is required'
    }
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  // --- Extended Details ---
  aboutFeatures: [{
    type: String,
    trim: true
  }],
  aboutDescription: {
    type: String,
    trim: true,
    default: ''
  },
  specifications: [specSchema],
  idealFor: [{
    type: String,
    trim: true
  }],
  deliveryTime: {
    type: String,
    trim: true,
    default: '3 to 8 days'
  }
}, {
  timestamps: true // Automatically creates createdAt and updatedAt fields
});

module.exports = mongoose.model('Product', productSchema);