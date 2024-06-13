const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const ApplicationSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4, // Automatically generate a unique ID
    unique: true,
  },
  img: String,
  date: {
    type: Date,
    default: Date.now,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dob: {
    type: String
  },
  gender: {
    type: String,
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  state: {
    type: String,
    required: true,
  },
  
  technology: {
    type: String,
    required: true,
  },
  preferredTechnology: {
    type: String,
    required: true,
  },
  project: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Pending', // Default status is 'Pending'
  }
});

module.exports = mongoose.model('Application', ApplicationSchema);
