// console.log("Node is Running...")

// const { default: mongoose } = require('mongoose');
// const app = require('./app');
// const port = 3001;
// const host = '127.0.0.1';

// const server = app.listen(port,host, () =>{
//     console.log(`Node server is listening to ${server.address().port}`)
// });

// mongoose.connect("mongodb+srv://Tharushika:MilkMate2024@milk-mate-web.rd3iyax.mongodb.net/?retryWrites=true&w=majority&appName=Milk-Mate-Web")
// .then(()=>{
//     console.log('Connected to Database');
// })

// .catch(err =>{
//     console.log("Can't connect to Database")
// })


// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');  // Import CORS

const sellerRoutes = require('./routes/seller');
const adminRoutes = require('./Routes/admin');

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
