'use strict';

const User = require('../models/user');

const passport = require('../utils/passport');

const PassportError = passport.PassportError;

passport.serializeUser(user => Promise.resolve(user ? user.id : undefined));
passport.deserializeUser(async (session) => {
  const user = (await User.findById(session))._info;

  return session && user;
});

passport.use('local', async function (params) {
  const user = await User.findOne({
    username: params.username
  });

  if (!user) {
    throw new PassportError('用户不存在');
  }

  if (!(await user.authenticate(params.password))) {
    throw new PassportError('用户名或密码错误');
  }

  return user;
});

module.exports = passport;
