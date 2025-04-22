const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const offerRoutes = require('./routes/offerRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/adminpanel', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

app.use('/api/admin', require('./routes/admin'));
app.use('/api/bus', require('./routes/busRoutes')); 
app.use('/api/acsleeper', require('./routes/acsleeperRoute'));
app.use('/api/nonac', require('./routes/nonacRoute'));
app.use('/api/offers', offerRoutes);
app.use('/api/auth', require('./routes/auth'));



const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
