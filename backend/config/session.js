'use strict';

const session = require('koa-session');
const redisStore = require('koa-redis');

module.exports = (config, app) => session({
  key: config.app.name,
  prefix: config.cookie.prefix,
  maxAge: config.cookie.expire,
  secure: config.cookie.secure,
  store: redisStore({
    host: config.redis.host,
    port: config.redis.port,
    db: config.redis.db
  })
}, app);
