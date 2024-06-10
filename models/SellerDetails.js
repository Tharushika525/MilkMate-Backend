
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const sellerDetailsSchema = new Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   phone: {
//     type: String,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
// });

// module.exports = mongoose.model('SellerDetails', sellerDetailsSchema);



const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sellerDetailsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  businessName: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  religion: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('SellerDetails', sellerDetailsSchema);
