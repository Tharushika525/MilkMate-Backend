const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  emailAddress: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  district: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  quantity: { type: Number, required: true },
  packSize: { type: String, required: true }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
