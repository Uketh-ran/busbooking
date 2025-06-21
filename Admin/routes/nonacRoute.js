const express = require('express');
const router = express.Router();
const Bus = require('../models/Bus');


router.get('/semi', async (req, res) => {
    try {
      // Fetch buses where the type is "2+2 Non-AC Semi Sleeper"
      const buses = await Bus.find({
        type: { $regex: /^nonac$/i }
      }).sort({ _id: -1 }); // Sort buses by most recently added
  
      if (buses.length === 0) {
        return res.status(404).json({ message: "No buses found" });
      }
  
      res.json(buses); // Send buses data as a response
    } catch (err) {
      console.error('Error fetching buses:', err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Update a bus
router.post('/semi/update/:id', async (req, res) => {
  try {
    const updatedBus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    res.json(updatedBus);  // Respond with the updated bus data
  } catch (err) {
    console.error('Error updating bus:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a bus
router.delete('/semi/:id', async (req, res) => {
  try {
    const deletedBus = await Bus.findByIdAndDelete(req.params.id);
    if (!deletedBus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    res.json({ message: 'Bus deleted successfully' });
  } catch (err) {
    console.error('Error deleting bus:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
