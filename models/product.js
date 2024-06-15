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


const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: String,
  productImage: String,  // Path to the uploaded image
  purchasePrice: Number,
  brand: String,
  quantity: Number,
  manufacturingDate: Date,
  approvalStatus: { type: String, enum: ['waiting', 'approved'], default: 'waiting' },
  paymentStatus: { type: String, enum: ['unpaid', 'ongoing'], default: 'unpaid' },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;




