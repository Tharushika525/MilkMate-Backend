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




// Chathura
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');


const port = 5000;

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
  streetName: String,
  district: String,
  religion: String,
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
},{collection: 'sellerdetails'});

const Seller = sellerConnection.model('Seller', sellerSchema);

// User Routes
app.post('/api/user', async (req, res) => {
  const { name, email, phone, password, businessName, city, religion } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, phone, password: hashedPassword, businessName, city, religion });

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

// Add the missing route for fetching all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post('/api/check-email', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    res.json({ exists: !!user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Login Endpoint
// Login Endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
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

// Add the missing route for fetching all sellers
app.get('/api/sellers', async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listen on port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



