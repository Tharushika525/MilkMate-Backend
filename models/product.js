const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: String,
  productImage: String,  // Assume URL or base64 encoded image
  purchasePrice: Number,
  brand: String,
  quantity: Number,
  manufacturingDate: Date,
  sellerName: String,
  phoneNumber: String,
  email: String,
  approved: { type: Boolean, default: false },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;







