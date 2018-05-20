const Koa = require('koa');
const path = require('path');
const onerror = require('koa-onerror');

const logger = require('../utils/logger')(__filename);
const router = require('../routes');

module.exports = (config) => {
  const app = new Koa();

  onerror(app);

  app
    .use(require('koa-static')(path.join(__dirname, '..', '../frontend')))
    .use(async (ctx, next) => {
      const start = new Date();
      await next();
      const ms = new Date() - start;
      logger.trace(`${ctx.method} ${ctx.url} - ${ms}ms`);
    });

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
