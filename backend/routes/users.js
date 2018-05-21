'use strict';

const router = require('koa-router')();

const User = require('../models/user');

router.get('/', async (ctx, next) => {
  const users = await User.find();
  ctx.body = users;
});

router.post('/signup', async (ctx, next) => {
  ctx.body = 'signup';
});

module.exports = router;
