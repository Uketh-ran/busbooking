const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (hardcoded)
mongoose.connect('mongodb://localhost:27017/bus-booking', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(" MongoDB connected"))
.catch(err => console.error(" MongoDB connection error:", err));

// Routes
const bookingRoutes = require('./routes/booking');
app.use('/api/bookings', bookingRoutes);

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
