const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
  name: String,
  gender: String,
  age: Number,
  state: String,
});

const bookingSchema = new mongoose.Schema({
  busId: String,
  selectedSeats: [String],
  passengers: [passengerSchema],
  email: String,
  countryCode: String,
  phone: String,
  totalAmount: Number,
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
