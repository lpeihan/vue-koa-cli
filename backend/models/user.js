'use strict';

const mongoose = require('mongoose');
const crypto = require('crypto');
const Promise = require('bluebird');
const _ = require('lodash');

const pbkdf2 = Promise.promisify(crypto.pbkdf2);

const Schema = mongoose.Schema;

/**
 * UserSchema
 */
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: String,
  salt: String,
  hash_password: String,
  create_date: { type: Number, default: Date.now() },
  update_date: String
});

/**
 * Hooks
 */
UserSchema
  .pre('save', function(next) {
    this.update_date = Date.now();
    next();
  });

/**
 * Virtuals
 */
UserSchema
  .virtual('_info')
  .get(function() {
    const result = _.pick(this, [
      'id',
      'username',
      'email',
      'create_date',
      'update_date'
    ]);
    return result;
  });

UserSchema
  .virtual('password')
  .set(function(password) {
    this.salt = crypto.randomBytes(15).toString('base64');
    this.hash_password = this.encryptPassword(password);
  });

/**
 * Methods
 */
UserSchema.methods = {
  async authenticate(password) {
    return (await this.encryptPasswordAsync(password)) === this.hash_password;
  },
  encryptPassword(password) {
    return crypto.pbkdf2Sync(password, this.salt || 'salt', 2, 63, 'sha256').toString('base64');
  },
  async encryptPasswordAsync(password) {
    return (await pbkdf2(password, this.salt || '', 2, 63, 'sha256'))
      .toString('base64');
  }
};

module.exports = mongoose.model('User', UserSchema);
