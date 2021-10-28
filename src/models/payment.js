const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  total: Number,
  status: String,
  transaction_id: String,
  last_digits_cardnumber: String,
  payment_method: {
    type: Schema.Types.ObjectId,
    ref: 'PaymentMethod',
  },
}, {
  timestamps: true,
});

const PaymentModel = mongoose.model('Payment', PaymentSchema);
module.exports = { PaymentSchema, PaymentModel };