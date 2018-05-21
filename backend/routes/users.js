'use strict';

const router = require('koa-router')();

const passport = require('../utils/passport');
const User = require('../models/user');

router.get('/', async (ctx, next) => {
  const users = await User.find();
  ctx.body = users;
});

router.post('/signup', async (ctx) => {
  const user = new User(ctx.request.body);
  await user.save();
  ctx.body = user;
});

router.post('/login', async (ctx) => {
  console.log('hhhhh');
  await passport.login('local', ctx);

  ctx.body = { success: true };
});

module.exports = router;
