'use strict';

const Koa = require('koa');
const path = require('path');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');

const session = require('./session');
const logger = require('../utils/logger')(__filename);
const router = require('../routes');
const koaStatic = require('koa-static');
const passport = require('./passport');

module.exports = (config) => {
  const app = new Koa();

  app.keys = config.cookie.keys;

  onerror(app);

  app
    .use(bodyparser())
    .use(async (ctx, next) => {
      await next();

      const userCookie = ctx.user
        ? encodeURIComponent(JSON.stringify(ctx.user))
        : undefined;

      ctx.cookies.set(`${config.app.name}.user`, userCookie, {
        httpOnly: false,
        maxAge: config.cookie.maxAge,
        signed: false,
        overwrite: true
      });
    })
    .use(koaStatic(path.join(__dirname, '..', `../${config.dir.frontend}`)))
    .use(koaStatic(path.join(__dirname, '..', `../${config.dir.public}`)))

    .use(async (ctx, next) => {
      const start = new Date();
      await next();
      const ms = new Date() - start;
      logger.trace(`${ctx.method} ${ctx.url} - ${ms}ms`);
    })

    .use(session(config, app))
    .use(passport.middleware());

  app
    .use(router.routes())
    .use(router.allowedMethods());

  app.promise = new Promise((resolve, reject) => {
    app.listen(config.port, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
        logger.info(`koa listening on port ${config.port}`);
      }
    });
  });

  app.on('error', (err, ctx) => {
    logger.error('server error', err, ctx);
  });

  return app;
};
