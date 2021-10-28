const express = require('express');
const router = express.Router();
const { PaymentMethodModel: PaymentMethod } = require('../models/paymentMethod');

// Find all paymentMethod
router.get('/', async (req, res) => {
  const paymentMethod = await PaymentMethod.find().exec();

  return res.json({
    results: paymentMethod,
  });
});

// Find paymentMethod by id
router.get('/:id', async (req,res) => {
  const { id } = req.params;
  const paymentMethod = await PaymentMethod.findById(id);

  if (!paymentMethod) {
    return res.status(404).json({
      message: 'PaymentMethod not found',
    });
  }

  return res.json({
    data: paymentMethod,
  });
});

// Create a new paymentMethod
router.post('/', async (req, res) => {
  const {
    name,
    description,
  } = req.body;

  // TODO: Validate fields

  const paymentMethod = new PaymentMethod({
    name,
    description,
  });

  await paymentMethod.save();
  return res.status(201).json();
});

// Delete paymentMethod by id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await PaymentMethod.findByIdAndDelete(id);

  return res.json({
    message: 'PaymentMethod deleted',
  });
});

// Modify paymentMethod by id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
  } = req.body;

  const paymentMethod = await PaymentMethod.findByIdAndUpdate(id, {
    name,
    description,
  }, { new: true })

  if (!paymentMethod) {
    return res.status(404).json({
      message: 'PaymentMethod not found',
    });
  }

  return res.json({
    data: paymentMethod,
  });
});

module.exports = router;