const express = require('express');
const router = express.Router();
const Application = require('../models/Applications');

// Route to fetch hired jobs
router.get('/hiredjobs', async (req, res) => {
  try {
    const hiredJobs = await Application.find({ status: 'Hired' });
    res.json(hiredJobs);
  } catch (error) {
    console.error('Error fetching hired jobs:', error);
    res.status(500).json({ message: 'Failed to fetch hired jobs' });
  }
});

module.exports = router;
