const express = require('express');
const router = express.Router();
const { ProductModel: Product } = require('../models/product');

// Find all products
router.get('/', async (req, res) => {
  const products = await Product.find().exec();

  return res.json({
    results: products,
  });
});

// Find product by id
router.get('/:id', async (req,res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({
      message: 'Product not found',
    });
  }

  return res.json({
    data: product,
  });
});

// Create a new product
router.post('/', async (req, res) => {
  const {
    user,
    name,
    description,
    category,
    brand,
  } = req.body;

  // TODO: Validate fields

  const product = new Product({
    user,
    name,
    description,
    category,
    brand,
  });

  await product.save();
  return res.status(201).json();
});

// Delete product by id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);

  return res.json({
    message: 'Product deleted',
  });
});

// Modify product by id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    category,
    brand,
  } = req.body;

  const product = await Product.findByIdAndUpdate(id, {
    name,
    description,
    category,
    brand,
  }, { new: true })

  if (!product) {
    return res.status(404).json({
      message: 'Product not found',
    });
  }

  return res.json({
    data: product,
  });
});

module.exports = router;