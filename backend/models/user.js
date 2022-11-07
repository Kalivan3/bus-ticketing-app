const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
const {isEmail} = require('validator');

//create user schema
const userSchema = new mongoose.Schema({
  username:{
    type: String,
    required: [true, 'Please enter a username'],
    unique: true,
    trim: true,
    minlength: [5, 'Username should be a minimum of 5 characters']
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    trim: true,
    minlength: [8, 'Minimum password length is 8 characters']
  }
}, {
  timestamps: true
});

userSchema.plugin(uniqueValidator, {message: '{PATH} is already registered'});
module.exports = mongoose.model("User", userSchema);
