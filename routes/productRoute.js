const express = require('express');
const router = express.Router();
const productController = require('./../controllers/productController'); // Import order controller

// Get all products
router.post('/', productController.getAllProducts);



module.exports = router;
