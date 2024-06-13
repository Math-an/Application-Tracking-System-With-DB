const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const applicationRoutes = require('./routes/applicaions');
const authRoutes = require('./routes/auth');
const hiredRoutes = require('./routes/hired');
const view = require('./routes/viewapp')

const mongoAtlasUri = 'mongodb+srv://rmathan2404:Mathan@cluster0.rnq628h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongoAtlasUri);
    console.log("Mongoose is connected");
  } catch (e) {
    console.log("Could not connect to MongoDB", e);
  }
};

connectToMongoDB();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', authRoutes);
app.use('/api', applicationRoutes);
app.use('/api', hiredRoutes);
app.use('/api',view);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
