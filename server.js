const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User'); // Corrected path to your User model

const app = express();
const port = 5000;

mongoose.connect('mongodb+srv://Tharushika:MilkMate2024@milk-mate-web.rd3iyax.mongodb.net/?retryWrites=true&w=majority&appName=Milk-Mate-Web', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.post('/api/register', async (req, res) => { // Ensure correct route definition with leading '/'
  try {
    const { email, password, gender, city, streetName, remarks, district, terms } = req.body;
    const newUser = await User.create({ email, password, gender, city, streetName, remarks, district, terms });
    res.status(201).json({ success: true, userId: newUser._id });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
