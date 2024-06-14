const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const SellerDetails = require('../models/SellerDetails'); // Adjust the path as necessary

const JWT_SECRET = 'your_jwt_secret';

exports.register = async (req, res) => {
  const { name, email, phone, password, businessName, city, religion } = req.body;

  // Check if all required fields are provided
  if (!name || !email || !phone || !password || !businessName || !city || !religion) {
    return res.status(400).send('All fields are required.');
  }

  try {
    // Check if the user already exists
    const existingUser = await SellerDetails.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists with this email.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = new SellerDetails({
      name,
      email,
      phone,
      password: hashedPassword,
      businessName,
      city,
      religion
    });

    // Save the user to the database
    await newUser.save();

    console.log('User registered successfully:', newUser);
    res.status(201).send('User registered successfully');
  } catch (err) {
    console.error('Error inserting user into database:', err);
    res.status(500).send('Server error');
  }
};














// LogIn
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log('Email:', email, 'Password:', password);

  if (!email || !password) {
    console.log('Email and password are required.');
    return res.status(400).json({ message: 'Email and password required' });
  }

  try {
    // Find the user by email
    const user = await SellerDetails.findOne({ email });
    console.log('Query executed successfully.');
    console.log('Query results:', user);

    if (!user) {
      console.log('Invalid email or password.');
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = bcrypt.compareSync(password, user.password);
    console.log('Password match:', passwordMatch);

    if (!passwordMatch) {
      console.log('Invalid email or password.');
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });
    console.log('Token generated:', token);

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Error during login process:', err);
    res.status(400).send('Server error during login process');
  }
};
