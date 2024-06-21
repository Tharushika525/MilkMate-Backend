const Product = require('../models/product');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {console.log("run");

        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};