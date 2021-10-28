const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderDetailSchema = new Schema({
  product_variant: {
    type: Schema.Types.ObjectId,
    ref: 'ProductVariant',
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
  },
  quantity: Number,
}, {
  timestamps: true,
});

const OrderDetailModel = mongoose.model('OrderDetail', OrderDetailSchema);
module.exports = { OrderDetailSchema, OrderDetailModel };
