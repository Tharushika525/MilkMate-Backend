// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const cors = require('cors');  // Import CORS
// const authRoutes = require("./routes/authRoutes");
// const fs = require('fs');
// const path = require('path');


// const sellerRoutes = require('./routes/seller');
// const adminRoutes = require('./Routes/admin');

// const app = express();

// app.use(bodyParser.json());
// app.use(cors());  // Enable CORS

// // Connect to MongoDB
// mongoose.connect('mongodb+srv://Tharushika:MilkMate2024@milk-mate-web.rd3iyax.mongodb.net/?retryWrites=true&w=majority&appName=Milk-Mate-Web', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // Use routes
// app.use('/seller', sellerRoutes);
// app.use('/admin', adminRoutes);
// app.use("/api", authRoutes);
// app.use('/uploads', express.static('uploads'));

// // Ensure uploads directory exists
// const uploadDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }



// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });








// app.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173'
}));

// MongoDB Connection
mongoose.connect('mongodb+srv://Tharushika:MilkMate2024@milk-mate-web.rd3iyax.mongodb.net/?retryWrites=true&w=majority&appName=Milk-Mate-Web', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
const sellerRoutes = require('./routes/seller');
const adminRoutes = require('./routes/admin');
app.use('/seller', sellerRoutes);
app.use('/admin', adminRoutes);
app.use("/api", authRoutes);

// Serve static files (if needed)
app.use('/uploads', express.static('uploads'));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


