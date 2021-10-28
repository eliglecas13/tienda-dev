const express = require('express');
const router = express.Router();
const { AddressModel: Address } = require('../models/address');

// Find all addresses
router.get('/', async (req, res) => {
  const addresses = await Address.find().exec();

  return res.json({
    results: addresses,
  });
});

// Find address by id
router.get('/:id', async (req,res) => {
  const { id } = req.params;
  const address = await Address.findById(id);

  if (!address) {
    return res.status(404).json({
      message: 'Address not found',
    });
  }

  return res.json({
    data: address,
  });
});

// Create a new address
router.post('/', async (req, res) => {
  const {
    user,
    street,
    interior_number,
    city,
    postal_code,
    country,
    phone_number,
  } = req.body;

  // TODO: Validate fields

  const address = new Address({
    user,
    street,
    interior_number,
    city,
    postal_code,
    country,
    phone_number,
  });

  await address.save();
  return res.status(201).json();
});

// Delete address by id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Address.findByIdAndDelete(id);

  return res.json({
    message: 'Address deleted',
  });
});

// Modify address by id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    user,
    street,
    interior_number,
    city,
    postal_code,
    country,
    phone_number,
  } = req.body;

  const address = await Address.findByIdAndUpdate(id, {
    user,
    street,
    interior_number,
    city,
    postal_code,
    country,
    phone_number,
  }, { new: true })

  if (!address) {
    return res.status(404).json({
      message: 'Address not found',
    });
  }

  return res.json({
    data: address,
  });
});

module.exports = router;