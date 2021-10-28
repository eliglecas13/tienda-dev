const express = require('express');
const router = express.Router();
const { ReviewModel: Review } = require('../models/review');

// Find all reviews
router.get('/', async (req, res) => {
  const reviews = await Review.find().exec();

  return res.json({
    results: reviews,
  });
});

// Find review by id
router.get('/:id', async (req,res) => {
  const { id } = req.params;
  const review = await Review.findById(id);

  if (!review) {
    return res.status(404).json({
      message: 'Review not found',
    });
  }

  return res.json({
    data: review,
  });
});

// Create a new review
router.post('/', async (req, res) => {
  const {
    user,
    points,
    heading,
    comment,
    product,
  } = req.body;

  // TODO: Validate fields

  const review = new Review({
    user,
    points,
    heading,
    comment,
    product,
  });

  await review.save();
  return res.status(201).json();
});

// Delete review by id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Review.findByIdAndDelete(id);

  return res.json({
    message: 'Review deleted',
  });
});

// Modify review by id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    user,
    points,
    heading,
    comment,
    product,
  } = req.body;

  const review = await Review.findByIdAndUpdate(id, {
    user,
    points,
    heading,
    comment,
    product,
  }, { new: true })

  if (!review) {
    return res.status(404).json({
      message: 'Review not found',
    });
  }

  return res.json({
    data: review,
  });
});

module.exports = router;