const express = require('express');
const Offer = require('../models/Offer');
const router = express.Router();

// Get all offers
router.get('/', async (req, res) => {
  try {
    const offers = await Offer.find();
    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching offers', error });
  }
});

// Get a single offer by ID
router.get('/:id', async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }
    res.status(200).json(offer);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching offer', error });
  }
});

// Create a new offer
router.post('/', async (req, res) => {
  const { title, offer, valid, image, bg } = req.body;
  
  try {
    const newOffer = new Offer({
      title,
      offer,
      valid,
      image,
      bg,
    });

    await newOffer.save();
    res.status(201).json(newOffer);
  } catch (error) {
    res.status(400).json({ message: 'Error creating offer', error });
  }
});

// Update an offer using POST method
router.post('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { title, offer, valid, image, bg } = req.body;

  try {
    // Find the offer by ID and update it
    const updatedOffer = await Offer.findByIdAndUpdate(
      id,
      { title, offer, valid, image, bg },
      { new: true }  // This returns the updated document
    );

    if (!updatedOffer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    // Send the updated offer back in the response
    res.status(200).json(updatedOffer);
  } catch (error) {
    res.status(400).json({ message: 'Error updating offer', error });
  }
});

// Delete an offer
router.delete('/:id', async (req, res) => {
  try {
    const deletedOffer = await Offer.findByIdAndDelete(req.params.id);
    if (!deletedOffer) {
      return res.status(404).json({ message: 'Offer not found' });
    }
    res.status(200).json({ message: 'Offer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting offer', error });
  }
});

module.exports = router;
