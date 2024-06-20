





const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');  // Import CORS
const authRoutes = require("./routes/authRoutes");
const fs = require('fs');
const path = require('path');



const sellerRoutes = require('./Controller/seller');
const adminRoutes = require('./Controller/admin');

const app = express();

app.use(bodyParser.json());
app.use(cors());  // Enable CORS

// Connect to MongoDB
mongoose.connect('mongodb+srv://Tharushika:MilkMate2024@milk-mate-web.rd3iyax.mongodb.net/?retryWrites=true&w=majority&appName=Milk-Mate-Web', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Use routes
app.use('/seller', sellerRoutes);
app.use('/admin', adminRoutes);
app.use("/api", authRoutes);

app.use('/uploads', express.static('uploads'));

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});









