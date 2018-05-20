'use strict';

const Router = require('koa-router');
const send = require('koa-send');
const path = require('path');

const users = require('./users');

async function html(ctx) {
  await send(ctx, 'index.html', {
    root: path.join(__dirname, '..', '../frontend')
  });
}

const router = new Router();

router
  .use('/api/users', users.routes(), users.allowedMethods())

  .all('/', html)
  .all('/*', html);

module.exports = router;
