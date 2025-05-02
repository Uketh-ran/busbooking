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

router.get('/', async (req, res) => {
    const { page = 1, limit = 10, search = '' } = req.query;
  
    try {
      const bookings = await Booking.find({
        $or: [
          { busId: { $regex: search, $options: 'i' } },
          { 'passengers.name': { $regex: search, $options: 'i' } },
        ]
      })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
  
      const totalBookings = await Booking.countDocuments({
        $or: [
          { busId: { $regex: search, $options: 'i' } },
          { 'passengers.name': { $regex: search, $options: 'i' } },
        ]
      });
  
      res.json({
        bookings,
        totalPages: Math.ceil(totalBookings / limit),
        currentPage: parseInt(page),
      });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch bookings', details: err.message });
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const booking = await Booking.findByIdAndDelete(req.params.id);
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (err) {
      console.error('Error deleting booking:', err);
      res.status(500).json({ error: 'Failed to delete booking', details: err.message });
    }
  });

module.exports = router;