// const express = require('express');
// const router = express.Router();
// const Bus = require('../models/Bus');

// // GET /api/acsleeper - Fetch all "2+1 Ac sleeper" buses, most recently added
// router.get('/', async (req, res) => {
//     try {
//         // Match type exactly or using regex for flexible match
//         const buses = await Bus.find({
//             type: { $regex: /^2\+1\s*Ac\s*sleeper\s*$/i }
//         }).sort({ _id: -1 });

//         if (buses.length === 0) {
//             return res.status(404).json({ message: "No buses found" });
//         }

//         res.json(buses);
//     } catch (err) {
//         console.error('Error fetching buses:', err);
//         res.status(500).json({ error: 'Server error' });
//     }
// });

// router.get('/semi', async (req, res) => {
//     try {
//         const buses = await Bus.find({
//             type: { $regex: /^2\+2\s*Ac\s*semi\s*sleeper\s*$/i }
//         }).sort({ _id: -1 });

//         if (buses.length === 0) {
//             return res.status(404).json({ message: "No buses found" });
//         }

//         res.json(buses);
//     } catch (err) {
//         console.error('Error fetching buses:', err);
//         res.status(500).json({ error: 'Server error' });
//     }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Bus = require('../models/Bus');

// GET /api/acsleeper - Fetch all "2+1 Ac sleeper" buses, most recently added
router.get('/', async (req, res) => {
    try {
        // Match type exactly or using regex for flexible match
        const buses = await Bus.find({
            type: { $regex: /^2\+1\s*Ac\s*sleeper\s*$/i }
        }).sort({ _id: -1 });

        if (buses.length === 0) {
            return res.status(404).json({ message: "No buses found" });
        }

        res.json(buses);
    } catch (err) {
        console.error('Error fetching buses:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/acsleeper/semi - Fetch all "2+2 Ac semi sleeper" buses, most recently added
router.get('/semi', async (req, res) => {
    try {
        const buses = await Bus.find({
            type: { $regex: /^ac$/i }
        }).sort({ _id: -1 });

        if (buses.length === 0) {
            return res.status(404).json({ message: "No buses found" });
        }

        res.json(buses);
    } catch (err) {
        console.error('Error fetching buses:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/acsleeper/update/:id - Update bus details for Ac Sleeper by ID
router.post('/update/:id', async (req, res) => {
    try {
        const updatedBus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedBus) {
            return res.status(404).json({ message: 'Bus not found' });
        }

        res.json(updatedBus);
    } catch (err) {
        console.error('Error updating bus:', err);
        res.status(500).json({ error: 'Failed to update bus' });
    }
});

// DELETE /api/acsleeper/:id - Delete bus by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedBus = await Bus.findByIdAndDelete(req.params.id);

        if (!deletedBus) {
            return res.status(404).json({ message: 'Bus not found' });
        }

        res.json({ message: 'Bus deleted successfully' });
    } catch (err) {
        console.error('Error deleting bus:', err);
        res.status(500).json({ error: 'Failed to delete bus' });
    }
});

// POST /api/acsleeper/semi/update/:id - Update semi sleeper bus by ID
router.post('/semi/update/:id', async (req, res) => {
    try {
        const updatedBus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedBus) {
            return res.status(404).json({ message: 'Semi Sleeper Bus not found' });
        }

        res.json(updatedBus);
    } catch (err) {
        console.error('Error updating semi sleeper bus:', err);
        res.status(500).json({ error: 'Failed to update semi sleeper bus' });
    }
});

// DELETE /api/acsleeper/semi/:id - Delete semi sleeper bus by ID
router.delete('/semi/:id', async (req, res) => {
    try {
        const deletedBus = await Bus.findByIdAndDelete(req.params.id);

        if (!deletedBus) {
            return res.status(404).json({ message: 'Semi Sleeper Bus not found' });
        }

        res.json({ message: 'Semi Sleeper Bus deleted successfully' });
    } catch (err) {
        console.error('Error deleting semi sleeper bus:', err);
        res.status(500).json({ error: 'Failed to delete semi sleeper bus' });
    }
});


module.exports = router;
