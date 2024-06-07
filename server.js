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
  useUnifiedTopology: true
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Schema and Model
const formSchema = new mongoose.Schema({
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

const Form = mongoose.model('user', formSchema);

// Routes
app.post('/api/user', async (req, res) => {
  const { name, email, password, gender, city, streetName, remarks, district, terms} = req.body;
  const newForm = new Form({ name, email, password, gender, city, streetName, remarks, district, terms });

  try {
    await newForm.save();
    res.status(201).json(newForm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
