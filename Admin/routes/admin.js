const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const JWT_SECRET = 'yourSecretKey'; // 🔐 use a strong secret in production

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('🔐 Login attempt:', email, password);
  
    try {
      const admin = await Admin.findOne({ email });
      console.log('🧑‍💻 Admin found:', admin);
  
      if (!admin || admin.password !== password) {
        console.log(' Invalid credentials');
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ id: admin._id }, 'yourSecretKey', { expiresIn: '1h' });
      console.log(' Login success');
      res.json({ token });
    } catch (err) {
      console.error(' Server error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
