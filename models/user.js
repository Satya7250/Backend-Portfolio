const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 3000,
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
