const mongoose = require('mongoose');
const uuid = require('uuid');

const { hashPassword } = require('../auth/auth.utils');

const userSchema = new mongoose.Schema({
  id: { type: String, default: uuid },
  name: String,
  login: String,
  password: String
});

async function hashUserPassword(next) {
  this.password = await hashPassword(this.password);

  next();
}

userSchema.pre('save', hashUserPassword);

const User = mongoose.model('User', userSchema);

module.exports = { User };
