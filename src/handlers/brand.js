const express = require('express');
const router = express.Router();
const { BrandModel: Brand } = require('../models/brand');

// Find all brands
router.get('/', async (req, res) => {
  const brands = await Brand.find().exec();

  return res.json({
    results: brands,
  });
});

// Find brand by id
router.get('/:id', async (req,res) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);

  if (!brand) {
    return res.status(404).json({
      message: 'Brand not found',
    });
  }

  return res.json({
    data: brand,
  });
});

// Create a new brand
router.post('/', async (req, res) => {
  const {
    name,
    description,
    featured_image,
  } = req.body;

  // TODO: Validate fields

  const brand = new Brand({
    name,
    description,
    featured_image,
  });

  await brand.save();
  return res.status(201).json();
});

// Delete brand by id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Brand.findByIdAndDelete(id);

  return res.json({
    message: 'Brand deleted',
  });
});

// Modify brand by id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    featured_image,
  } = req.body;

  const brand = await Brand.findByIdAndUpdate(id, {
    name,
    description,
    featured_image,
  }, { new: true })

  if (!brand) {
    return res.status(404).json({
      message: 'Brand not found',
    });
  }

  return res.json({
    data: brand,
  });
});

module.exports = router;