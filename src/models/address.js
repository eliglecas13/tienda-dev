const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  street: String,
  interior_number: Number,
  city: String,
  postal_code: Number,
  country: String,
  phone_number: String,
}, {
  timestamps: true,
});

const AddressModel = mongoose.model('Address', AddressSchema);
module.exports = { AddressSchema, AddressModel };