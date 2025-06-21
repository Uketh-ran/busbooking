

const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
  
  name: String,
  gender: String,
  age: Number,
  state: String,
});

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',          // assuming your user model is named 'User'
    required: true,
  },
  username: String,   // Add this field to store the user's name
  bus: {
    busName: String,  // Storing bus name
    from: String,     // Storing departure location
    to: String,       // Storing destination location
    price: Number,
    dateOfDeparture: Date,
  },
  selectedSeats: [String],
  passengers: [passengerSchema],
  email: String,
  countryCode: String,
  phone: String,
  totalAmount: Number,
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);


