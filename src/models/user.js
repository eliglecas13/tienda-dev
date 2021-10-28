const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema Definition
const UserSchema = new Schema({
  username: {
    type: String,
    index: {
      unique: true,
    },
  },
  email: {
    type: String,
    index: {
      unique: true,
    },
  },
  fullname: String,
  password: String,
  user_type: String,
}, {
  timestamps: true, // created_at, updated_at
});

// Model
const UserModel = mongoose.model('User', UserSchema);
module.exports = { UserSchema, UserModel };
