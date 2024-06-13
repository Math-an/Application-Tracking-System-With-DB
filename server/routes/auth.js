const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Signup Route
router.post('/signup', async (req, res) => {
  const { firstName, lastName, mobileNumber, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, error: 'Passwords do not match' });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }

    user = new User({
      firstName,
      lastName,
      mobileNumber,
      email,
      password
    });

    console.log(user);
    await user.save();
    return res.json({ success: true });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, error: 'Invalid credentials' });
      }
  
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ success: false, error: 'Invalid credentials' });
      }
  
      return res.json({ success: true });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ success: false, error: 'Server error' });
    }
  });
module.exports = router;
