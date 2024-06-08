const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.post('/approve-product/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.approved = true;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



// Add this route to handle product deletion
router.delete('/delete-product/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      await Product.findByIdAndDelete(productId);
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete product', error });
    }
  });
  

module.exports = router;
