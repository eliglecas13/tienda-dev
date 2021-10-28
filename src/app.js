require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB
const connectMongoDB = () => mongoose.connect("mongodb://localhost/babali", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Welcome route
app.get('/', (req, res) => {
  return res.json({
    message: 'Welcome to Babali Shop',
  });
});

// API Routes
app.use('/api', require('./handlers'));

connectMongoDB().then(() => {
  app.listen("3000", () => {
    console.log(`Babali Shop API on port 3000`);
  })
});