const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;
const JWT_SECRET = 'your_jwt_secret'; // Replace with your own secret key

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection for user database
mongoose.connect('mongodb+srv://Tharushika:MilkMate2024@milk-mate-web.rd3iyax.mongodb.net/user?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB (user database)');
  })
  .catch((error) => {
    console.error('Connection error for users:', error);
  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error for users:'));
db.once('open', () => {
  console.log('Connected to MongoDB (user database)');
});

// MongoDB connection for seller database
const sellerConnection = mongoose.createConnection('mongodb+srv://Tharushika:MilkMate2024@milk-mate-web.rd3iyax.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
sellerConnection.on('error', console.error.bind(console, 'connection error for sellers:'));
sellerConnection.once('open', () => {
  console.log('Connected to MongoDB (seller database)');
});

// User Schema and Model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  businessName: String,
  city: String,
  religion: String,
  role: { type: String, default: 'user' } // Added role field
});

const User = mongoose.model('User', userSchema);

// Seller Schema and Model
const sellerSchema = new mongoose.Schema({
  businessName: String,
  address1: String,
  address2: String,
  city: String,
  region: String,
  postalCode: String,
  country: String,
  firstName: String,
  lastName: String,
  phoneNumber: String,
  mobilePhone: String,
  emailAddress: String,
  terms: Boolean,
});

const Seller = sellerConnection.model('Seller', sellerSchema);

// Middleware for authentication
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied, no token provided.' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

// Middleware for admin authorization
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied, not an admin.' });
  }
  next();
};

// User Registration
app.post('/api/user', async (req, res) => {
  const { name, email, phone, password, businessName, city, religion, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, phone, password: hashedPassword, businessName, city, religion, role });

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// User Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User Routes (Protected)
app.get('/api/user/:id', authenticateJWT, async (req, res) => {
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

app.put('/api/user/:id', authenticateJWT, async (req, res) => {
  try {
    const { password, ...updateData } = req.body;
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }
    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/user/:id', authenticateJWT, async (req, res) => {
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

// Admin Routes (Protected and Admin Only)
app.get('/api/users', authenticateJWT, isAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/sellers', authenticateJWT, isAdmin, async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Seller Routes
app.post('/api/seller', async (req, res) => {
  const {
    businessName,
    address1,
    address2,
    city,
    region,
    postalCode,
    country,
    firstName,
    lastName,
    phoneNumber,
    mobilePhone,
    emailAddress,
    terms
  } = req.body;

  const newSeller = new Seller({
    businessName,
    address1,
    address2,
    city,
    region,
    postalCode,
    country,
    firstName,
    lastName,
    phoneNumber,
    mobilePhone,
    emailAddress,
    terms
  });

  try {
    await newSeller.save();
    res.status(201).json(newSeller);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/seller/:id', authenticateJWT, async (req, res) => {
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

app.put('/api/seller/:id', authenticateJWT, async (req, res) => {
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

app.delete('/api/seller/:id', authenticateJWT, async (req, res) => {
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

// Listen on port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
