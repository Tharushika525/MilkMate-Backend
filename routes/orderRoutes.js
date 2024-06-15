const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController'); // Import order controller

// Route to create an order
router.post('/', orderController.createOrder);

// Route to get all orders
router.get('/', orderController.getOrder);

// Route to delete an order by ID
router.delete('/:orderId', orderController.deleteOrder);


// Route to update an order by ID
router.put('/:orderId', orderController.updateOrder);

module.exports = router;
