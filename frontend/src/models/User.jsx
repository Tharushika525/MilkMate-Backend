// User.js (assuming this is the User model file)

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  streetName: {
    type: String,
    required: true,
  },
  remarks: String,
  district: {
    type: String,
    required: true,
  },
  terms: {
    type: Boolean,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
