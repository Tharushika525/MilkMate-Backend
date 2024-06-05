const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const uri = 'mongodb://localhost:27017/users'; // Local MongoDB connection string to the 'users' database
mongoose.connect(uri, { useNewUrlParser: true }); // Simply connecting with the URI

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  gender: String,
  city: String,
  streetName: String,
  remarks: String,
  district: String,
  terms: Boolean,
});

const User = mongoose.model('register', userSchema); // Use 'register' collection

app.post('/api/register', async (req, res) => {
  const newUser = new User(req.body);

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
