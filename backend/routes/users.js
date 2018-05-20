'use strict';

const router = require('koa-router')();

const User = require('../models/user');

router.get('/', async (ctx, next) => {
  const users = await User.find();
  ctx.body = users;
});

module.exports = router;
