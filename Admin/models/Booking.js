// const mongoose = require('mongoose');

// const passengerSchema = new mongoose.Schema({
//   name: String,
//   gender: String,
//   age: Number,
//   state: String,
// });

// const bookingSchema = new mongoose.Schema({
//   busId: String,
//   selectedSeats: [String],
//   passengers: [passengerSchema],
//   email: String,
//   countryCode: String,
//   phone: String,
//   totalAmount: Number,
// }, { timestamps: true });

// module.exports = mongoose.model('Booking', bookingSchema);

const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
  name: String,
  gender: String,
  age: Number,
  state: String,
});

const bookingSchema = new mongoose.Schema({
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

// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//   bus: {
//     busName: String,
//     from: String,
//     to: String,
//     price: Number,
//     origin: String,
//     destination: String,
//     date: Date,
//   },
//   passengers: [{
//     name: String,
//     gender: String,
//     age: Number,
//     state: String,
//   }],
//   selectedSeats: [String],
//   email: String,
//   countryCode: String,
//   phone: String,  // Assuming you're storing seat numbers as an array of strings
//   totalAmount: Number,
// });

// const Booking = mongoose.model('Booking', bookingSchema);

// module.exports = Booking;
