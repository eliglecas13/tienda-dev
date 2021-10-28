const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentMethodSchema = new Schema({
  name: String,
  description: String,
}, {
  timestamps: true,
});

const PaymentMethodModel = mongoose.model('PaymentMethod', PaymentMethodSchema);
module.exports = { PaymentMethodSchema, PaymentMethodModel };
