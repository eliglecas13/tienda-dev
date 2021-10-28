const express = require('express');
const router = express.Router();
const { CategoryModel: Category } = require('../models/category');
const permissions = require('../middlewares/permissions');

// Find all categories
router.get('/', permissions('admin', 'customer'), async (req, res) => {
  const categories = await Category.find().exec();

  return res.json({
    results: categories,
  });
});

// Find category by id
router.get('/:id', permissions('admin'), async (req,res) => {
  const { id } = req.params;
  const category = await Category.findById(id);

  if (!category) {
    return res.status(404).json({
      message: 'Category not found',
    });
  }

  return res.json({
    data: category,
  });
});

// Create a new category
router.post('/', permissions('admin'), async (req, res) => {
  const {
    name,
    description,
    featured_image,
  } = req.body;

  // TODO: Validate fields

  const category = new Category({
    name,
    description,
    featured_image,
  });

  await category.save();
  return res.status(201).json();
});

// Delete category by id
router.delete('/:id', permissions('admin'), async (req, res) => {
  const { id } = req.params;
  await Category.findByIdAndDelete(id);

  return res.json({
    message: 'Category deleted',
  });
});

// Modify category by id
router.put('/:id', permissions('admin'), async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    featured_image,
  } = req.body;

  const category = await Category.findByIdAndUpdate(id, {
    name,
    description,
    featured_image,
  }, { new: true })

  if (!category) {
    return res.status(404).json({
      message: 'Category not found',
    });
  }

  return res.json({
    data: category,
  });
});

module.exports = router;