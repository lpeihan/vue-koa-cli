'use strict';

const router = require('koa-router')();

const passport = require('../utils/passport');
const User = require('../models/user');
const logger = require('../utils/logger')(__filename);
const handleError = require('../utils/handleError')(logger);

const { validateSignup } = require('../services/users');

/*
 * signup
 */
router.post('/signup', async (ctx) => {
  try {
    const { isValid, errors } = await validateSignup(ctx.request.body);
    const {
      username, password, email
    } = ctx.request.body;

    if (isValid) {
      const user = new User({ username, password, email });
      await user.save();
      ctx.body = user._info;
    } else {
      ctx.status = 400;
      ctx.body = errors;
    }
  } catch (err) {
    handleError('signup failed', err, ctx);
  }
});

/*
 * login
 */
router.post('/login', async (ctx) => {
  try {
    const user = await passport.login('local', ctx);

    ctx.body = user;
  } catch (err) {
    handleError('login failed', err, ctx);
  }
});

/*
 * logout
 */
router.delete('/logout', async (ctx) => {
  try {
    await passport.logout(ctx);
    ctx.body = null;
  } catch (err) {
    handleError('logout failed', err, ctx);
  }
});

module.exports = router;
