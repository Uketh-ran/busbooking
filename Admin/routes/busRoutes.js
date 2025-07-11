
const express = require('express');
const Bus = require('../models/Bus'); 
const router = express.Router();

// POST route to add a bus
router.post('/add', async (req, res) => {
  try {
    const busData = req.body;  // Ensure body parsing is correctly done
    const bus = new Bus(busData);
    await bus.save();
    res.status(201).json({ message: 'Bus added successfully!' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to add bus', details: err.message });
  }
});

// GET route to fetch all buses
router.get('/', async (req, res) => {
    try {
        const buses = await Bus.find();  // Fetch all buses from the database
        res.json(buses);  // Send the buses as a response
    } catch (err) {
        res.status(500).json({ message: 'Error fetching buses' });
    }
});

router.post('/update/:id', async (req, res) => {
  try {
      const updatedBus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedBus) {
          return res.status(404).json({ message: 'Bus not found' });
      }
      console.log('Updated Bus:', updatedBus);
      res.json(updatedBus);
  } catch (err) {
    console.error('Error updating bus:', err);  // Log any errors that occur
      res.status(500).json({ message: 'Failed to update bus', error: err });
  }
});

// DELETE route to delete a bus
router.delete('/:id', async (req, res) => {
  try {
      const deletedBus = await Bus.findByIdAndDelete(req.params.id);
      if (!deletedBus) {
          return res.status(404).json({ message: 'Bus not found' });
      }
      res.json({ message: 'Bus deleted successfully' });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to delete bus', error: err });
  }
});

// GET route to fetch buses by status (enabled or disabled)
router.get('/buses/status/:status', async (req, res) => {
  try {
    const status = req.params.status === 'enabled' ? true : false;
    const buses = await Bus.find({ status: status });
    res.json(buses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST route to update bus status (enable/disable)
router.post('/update/status/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedBus = await Bus.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }  // returns the updated document
    );

    if (!updatedBus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    res.json({ message: 'Bus status updated', bus: updatedBus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update bus status' });
  }
});
// POST route to book a seat
router.post('/:id/bookseat', async (req, res) => {
  const { seatNumber } = req.body;

  if (typeof seatNumber !== 'number') {
    return res.status(400).json({ message: "Invalid seat number" });
  }

  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) return res.status(404).json({ message: "Bus not found" });

    if (bus.bookedSeats && bus.bookedSeats.includes(seatNumber)) {
      return res.status(400).json({ message: "Seat already booked" });
    }

    if (!bus.bookedSeats) {
      bus.bookedSeats = []; // Initialize if not present
    }

    bus.bookedSeats.push(seatNumber);
    bus.seatsAvailable = bus.seatsAvailable - 1;
    await bus.save();

    res.json({ success: true, bookedSeats: bus.bookedSeats });
  } catch (err) {
    console.error("Seat booking error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET route to fetch booked seats for a bus
router.get('/:id/bookedseats', async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) return res.status(404).json({ message: "Bus not found" });

    res.json({ bookedSeats: bus.bookedSeats || [] });
  } catch (err) {
    console.error("Fetching booked seats error:", err);
    res.status(500).json({ message: "Failed to fetch booked seats" });
  }
});


module.exports = router;
