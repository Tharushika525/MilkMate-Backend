const Order = require('../models/Order.model');

// Create a new order
exports.createOrder = async (orderData) => {
  const order = new Order(orderData);
  return await order.save();
};

// Get an order by ID
exports.getOrder = async (id) => {
  return await Order.findById(id);
};

// Update an order by ID
exports.updateOrder = async (id, orderData) => {
  return await Order.findByIdAndUpdate(id, orderData, { new: true });
};

// Delete an order by ID
exports.deleteOrder = async (id) => {
  return await Order.findByIdAndDelete(id);
};
