const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

router.post('/', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json({ message: 'Booking saved successfully' });
  } catch (err) {
    console.error('Booking Error:', err);
    res.status(500).json({ error: 'Failed to save booking', details: err.message });
  }
});

module.exports = router;
