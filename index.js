const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const orderRoutes = require('./routes/orderRoutes'); // Import order routes
const productRoute = require('./routes/productRoute'); // Import order routes


require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Tharushika:MilkMate2024@milk-mate-web.rd3iyax.mongodb.net/?retryWrites=true&w=majority&appName=Milk-Mate-Web', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('connection error:', error);
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Use order routes
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoute);


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
