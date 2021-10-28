const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  points: Number,
  heading: String,
  comment: String,
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
}, {
  timestamps: true,
});

const ReviewModel = mongoose.model('Review', ReviewSchema);
module.exports = { ReviewSchema, ReviewModel };