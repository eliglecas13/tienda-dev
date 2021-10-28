const express = require('express');
const router = express.Router();
const { PaymentModel: Payment } = require('../models/payment');

// Find all payments
router.get('/', async (req, res) => {
  const payments = await Payment.find().exec();

  return res.json({
    results: payments,
  });
});

// Find payment by id
router.get('/:id', async (req,res) => {
  const { id } = req.params;
  const payment = await Payment.findById(id);

  if (!payment) {
    return res.status(404).json({
      message: 'Payment not found',
    });
  }

  return res.json({
    data: payment,
  });
});

// Create a new payment
router.post('/', async (req, res) => {
  const {
    total,
    status,
    transaction_id,
    last_digits_cardnumber,
    payment_method,
  } = req.body;

  // TODO: Validate fields

  const payment = new Payment({
    total,
    status,
    transaction_id,
    last_digits_cardnumber,
    payment_method,
  });

  await payment.save();
  return res.status(201).json();
});

// Delete payment by id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Payment.findByIdAndDelete(id);

  return res.json({
    message: 'Payment deleted',
  });
});

// Modify payment by id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    total,
    status,
    transaction_id,
    last_digits_cardnumber,
    payment_method,
  } = req.body;

  const payment = await Payment.findByIdAndUpdate(id, {
    total,
    status,
    transaction_id,
    last_digits_cardnumber,
    payment_method,
  }, { new: true })

  if (!payment) {
    return res.status(404).json({
      message: 'Payment not found',
    });
  }

  return res.json({
    data: payment,
  });
});

module.exports = router;