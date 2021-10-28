const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: String,
  description: String,
  featured_image: String,
}, {
  timestamps: true,
});

const CategoryModel = mongoose.model('Category', CategorySchema);
module.exports = { CategorySchema, CategoryModel };
