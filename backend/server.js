const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const mongoURI = 'your-mongodb-uri-here';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a simple schema
const FormSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Form = mongoose.model('Form', FormSchema);

// Define a POST route to handle form submissions
app.post('/submit', (req, res) => {
  const newForm = new Form(req.body);
  newForm.save((err) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send('Form submitted successfully');
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
