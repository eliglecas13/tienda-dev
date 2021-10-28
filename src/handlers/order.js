const express = require('express');
const router = express.Router();
const { OrderModel: Order } = require('../models/order');

// Find all orders
router.get('/', async (req, res) => {
  const orders = await Order.find().exec();

  return res.json({
    results: orders,
  });
});

// Find order by id
router.get('/:id', async (req,res) => {
  const { id } = req.params;
  const order = await Order.findById(id);

  if (!order) {
    return res.status(404).json({
      message: 'Order not found',
    });
  }

  return res.json({
    data: order,
  });
});

// Create a new order
router.post('/', async (req, res) => {
  const {
    user,
  } = req.body;

  // TODO: Validate fields

  const order = new Order({
    user,
    status: 'PENDING',
    subtotal: 0,
    discount: 0,
    total: 0,
  });

  await order.save();
  return res.status(201).json();
});

// Delete order by id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Order.findByIdAndDelete(id);

  return res.json({
    message: 'Order deleted',
  });
});

// Modify order by id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    status,
    payment,
    address,
  } = req.body;

  const order = await Order.findByIdAndUpdate(id, {
    status,
    payment,
    address,
  }, { new: true })

  if (!order) {
    return res.status(404).json({
      message: 'Order not found',
    });
  }

  return res.json({
    data: order,
  });
});

module.exports = router;