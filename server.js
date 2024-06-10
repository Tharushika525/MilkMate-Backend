const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://Tharushika:MilkMate2024@milk-mate-web.rd3iyax.mongodb.net/user?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('connection error:', error);
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Schema and Model for Users
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, 
  gender:String, 
  city:String, 
  streetName: String,
  remarks: String, 
  district: String, 
  terms: String,
});

const User = mongoose.model('User', userSchema);

// Schema and Model for Seller Details
const sellerSchema = new mongoose.Schema({
  name: String,
  email: String,
  shopName: String,
  contact: String,
  address: String,
});

const Seller = mongoose.model('Seller', sellerSchema);

// User Routes
app.post('/api/user', async (req, res) => {
  const { name, email, password, gender, city, streetName, remarks, district, terms} = req.body;
  const newUser = new User({ name, email, password, gender, city, streetName, remarks, district, terms });

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/user/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/user/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Seller Routes
app.post('/api/seller', async (req, res) => {
  const { name, email, shopName, contact, address }
  const newSeller = new Seller({ name, email, shopName, contact, address });

  try {
    await newSeller.save();
    res.status(201).json(newSeller);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/seller/:id', async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }
    res.json(seller);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/seller/:id', async (req, res) => {
  try {
    const seller = await Seller.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }
    res.json(seller);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/seller/:id', async (req, res) => {
  try {
    const seller = await Seller.findByIdAndDelete(req.params.id);
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }
    res.json({ message: 'Seller deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
