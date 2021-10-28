const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  status: String,
  subtotal: Number,
  discount: Number,
  total: Number,
  payment: {
    type: Schema.Types.ObjectId,
    ref: 'Payment',
  },
  address: {
    type: Schema.Types.ObjectId,
    ref: 'Address',
  }
}, {
  timestamps: true,
});

const OrderModel = mongoose.model('Order', OrderSchema);
module.exports = { OrderSchema, OrderModel };
