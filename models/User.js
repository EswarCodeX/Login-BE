const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    // enum: ['male', 'female', 'other'], // user didn't specify strictness, so keeping it open or simple
    required: true,
  },
  dob: {
    type: String, // Keeping as string to accept various formats from frontend, e.g. "YYYY-MM-DD"
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', UserSchema);
