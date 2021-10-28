const express = require('express');
const router = express.Router();
const authorization = require('../middlewares/authorization');

// Define modules/handlers of API
router.use('/auth', require('./auth'));

// Middleware of Authorization
router.use(authorization);
router.use('/category', require('./category'));
router.use('/brand', require('./brand'));
router.use('/payment_method/', require('./paymentMethod'));
router.use('/address/', require('./address'));
router.use('/payment/', require('./payment'));
router.use('/review', require('./review'));
router.use('/order', require('./order'));
router.use('/product', require('./product'));

module.exports = router;