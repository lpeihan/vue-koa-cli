'use strict';

const validator = require('validator');

const User = require('../models/user');

const { isEmpty } = require('lodash');

exports.validateSignup = async function(user) {
  let errors = {};

  if (validator.isEmpty(user.username)) {
    errors.username = 'The field is required';
  }

  if (user.username && await User.findOne({ username: user.username })) {
    errors.username = 'There is user with such username';
  }

  if (validator.isEmpty(user.email)) {
    errors.email = 'The field is required';
  }

  if (!validator.isEmail(user.email)) {
    errors.email = 'Email is invalid';
  }

  if (validator.isEmpty(user.password)) {
    errors.password = 'The field is required';
  }

  if (validator.isEmpty(user.passwordConfirmation)) {
    errors.passwordConfirmation = 'The field is required';
  }

  if (!validator.equals(user.password, user.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
