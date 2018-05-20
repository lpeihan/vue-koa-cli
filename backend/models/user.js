'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password_digest: String,
  create_date: { type: Number, default: Date.now() },
  update_date: String
});

module.exports = mongoose.model('User', UserSchema);
