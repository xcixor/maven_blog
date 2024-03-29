const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserModel = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  isSuperUser: { type: Boolean, default: false },
  isStaff: { type: Boolean, default: false },
  password: { type: String },
  avatar: { type: String },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Male' }
});

module.exports = mongoose.model('User', UserModel);
