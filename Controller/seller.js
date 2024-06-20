


const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Directory to save uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filename
  }
});

const upload = multer({ storage: storage });

router.post('/add-product', upload.single('productImage'), async (req, res) => {
  const {
    productName,
    sellerName,
    purchasePrice,
    brand,
    quantity,
    manufacturingDate,
   
  } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'Product image is required' });
  }

  const newProduct = new Product({
    productName,
    productImage: req.file.path, // Save the file path to the database
    purchasePrice,
    brand,
    quantity,
    manufacturingDate,
    sellerName,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error('Error saving product:', err); // Log the error for debugging
    res.status(500).json({ message: err.message });
  }
});

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err); // Log the error for debugging
    res.status(500).json({ message: err.message });
  }
});

router.post('/update-payment/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByIdAndUpdate(productId, { paymentStatus: 'ongoing' }, { new: true });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;









