const express = require('express');
const router = express.Router();
const Application = require('../models/Applications');

// Handle form submission
router.post('/fillapplication', async (req, res) => {
  const formData = req.body;

  try {
    const newApplication = new Application(formData);
    await newApplication.save();
    res.status(201).json({ success: true, message: 'Application submitted successfully' });
    console.log(formData);
  } catch (error) {
    console.error('Error in submitting application:', error);
    res.status(500).json({ success: false, message: 'Failed to submit application. Please try again.' });
  }
});

// Route to fetch all applications (excluding 'Hired' status)
router.get('/applications', async (req, res) => {
  try {
    const applications = await Application.find({ status: { $ne: 'Hired' } });
    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
});

// Route to hire an application
router.post('/hire', async (req, res) => {
  try {
    const { id } = req.body;
    await Application.findByIdAndUpdate(id, { status: 'Hired' });
    res.json({ message: 'Hired successfully' });
  } catch (error) {
    console.error('Error hiring application:', error);
    res.status(500).json({ message: 'Failed to hire application' });
  }
});

// Route to reject an application
router.delete('/reject/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Application.findByIdAndDelete(id);
    res.json({ message: 'Application rejected successfully' });
  } catch (error) {
    console.error('Error rejecting application:', error);
    res.status(500).json({ message: 'Failed to reject application' });
  }
});

module.exports = router;
