// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   productName: String,
//   productImage: String,  // Path to the uploaded image
//   purchasePrice: Number,
//   brand: String,
//   quantity: Number,
//   manufacturingDate: Date,
//   approved: { type: Boolean, default: false },
// });

// const Product = mongoose.model('Product', productSchema);

// module.exports = Product;




// models/product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productImage: { type: String, required: true }, // Path to the uploaded image
  purchasePrice: { type: Number, required: true },
  brand: { type: String, required: true },
  quantity: { type: Number, required: true },
  manufacturingDate: { type: Date, required: true },
  approvalStatus: { type: String, enum: ['waiting', 'approved', 'deleted'], default: 'waiting' },
  paymentStatus: { type: String, enum: ['unpaid', 'ongoing'], default: 'unpaid' },
});

module.exports = mongoose.model('Product', productSchema);



