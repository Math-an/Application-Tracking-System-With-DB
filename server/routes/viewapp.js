const express = require('express');
const router = express.Router();
const Application = require('../models/Applications'); // Make sure the path is correct

// Fetch application by ID
router.get('/viewapplication/:id', async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    res.json(application);
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({ message: 'Failed to fetch application' });
  }
});


router.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const formData = req.body;  // Ensure we get the formData from the request body

  try {
    const updatedApplication = await Application.findByIdAndUpdate(id, formData, { new: true });
    res.json(updatedApplication);
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).json({ message: 'Failed to update application' });
  }
});

module.exports = router;