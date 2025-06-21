const mongoose = require('mongoose');

const BusSchema = new mongoose.Schema({
  busName: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  boardingPoints: [
    {
      id: { type: Number },
      name: { type: String },
      time: { type: String }
    }
  ],
  droppingPoints: [
    {
      id: { type: Number },
      name: { type: String },
      time: { type: String }
    }
  ],
  price: {
    type: Number,
    required: true
  },
  seatsAvailable: {
    type: Number,
    required: true
  },
  Totalseats: {
    type: Number,
    required: true
  },
  dateOfDeparture: {
    type: Date,
    required: true
  },
  dateOfArrival: {
    type: Date,
    required: true
  },
  departureTime: String,   
  arrivalTime: String, 
  sp: {
    type: String,
    required: true
  },
  ep: {
    type: String,
    required: true
  },
  duration: { 
    type: String
  },
  type: { 
    type: String
  },
  status: {
    type: String,
    enum: ['enabled', 'disabled'],
    required: true
  },
  bookedSeats: {
    type: [Number], // array of seat numbers
    default: []
  }
});

module.exports = mongoose.model('Bus', BusSchema);
