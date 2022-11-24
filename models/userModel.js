const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const validator = require('validator');

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please prodvid a name'],
    trim: true,
    maxlength: [30, 'A name must have less or equal then 40 characters'],
    minlength: [4, 'A name must have more or equal then 10 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords aren't the same",
    },
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// userSchema.virtual('reviews', {
//   ref: 'Review',
//   foreignField: 'tour', // the name of the field in the other model
//   localField: '_id',
// });

userSchema.pre('save', async function (next) {
  // in case password modified
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

// METHODS
userSchema.methods.checkPassword = async function (
  candidatePassword,
  realPassword
) {
  return await bcrypt.compare(candidatePassword, realPassword);
};
// userSchema.methods.correctPassword = async function (
//   candidatePassword,
//   userPassword
// ) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };
const User = mongoose.model('User', userSchema);

module.exports = User;
