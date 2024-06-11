const express = require('express');
const router = express.Router();
const Product = require('../models/product');


router.post('/add-product', async (req, res) => {
  const {
    productName,
    productImage,
    purchasePrice,
    brand,
    quantity,
    manufacturingDate,
    sellerName,
    phoneNumber,
    email,
  } = req.body;

  const newProduct = new Product({
    productName,
    productImage,
    purchasePrice,
    brand,
    quantity,
    manufacturingDate,
    sellerName,
    phoneNumber,
    email,
  });


  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/products', async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // router.get('/products', async (req, res) => {
  //   try {
  //     const products = await Product.find();
  //     res.json(products);
  //   } catch (err) {
  //     res.status(400).json({ message: err.message });
  //   }
  // });
  

 

module.exports = router;














