const mongoose = require('mongoose');
const uuid = require('uuid');

const userSchema = new mongoose.Schema({
  id: { type: String, default: uuid },
  name: String,
  login: String,
  password: String
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
