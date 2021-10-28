const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductVariantSchema = new Schema({
  sku: String,
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  price: Number,
  color: String,
  size: String,
  stock: Number,
}, {
  timestamps: true,
});

const ProductVariantModel = mongoose.model('ProductVariant', ProductVariantSchema);
module.exports = { ProductVariantSchema, ProductVariantModel };