'use strict';

var Mongoose = require('mongoose');

var userSchema = Mongoose.Schema({
  uid: {type: String, required: true},
  name: {type: String},
  age: {type: Number},
  gender: {type: String},
  photo: {type: String},
  email: {type: String},
  avatar: {type: String},
  address: {type: String},
  birthday: {type: Date},
  createdAt: {type: Date, default: Date.now}
});

var User = Mongoose.model('User', userSchema);

module.exports = User;
