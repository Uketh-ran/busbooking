const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  offer: {
    type: String,
    required: true,
  },
  valid: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  bg: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Offer', offerSchema);
