const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
  name: String,
  description: String,
  featured_image: String,
}, {
  timestamps: true,
});

const BrandModel = mongoose.model('Brand', BrandSchema);
module.exports = { BrandSchema, BrandModel };
