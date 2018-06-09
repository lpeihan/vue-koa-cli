const config = require('./backend/config');
const koa = require('./backend/config/koa');
const mongoose = require('./backend/config/mongoose');
const redis = require('./backend/config/redis');
const log4js = require('./backend/config/log4js');
const utils = require('./backend/utils');

log4js(config);
const logger = utils.logger(__filename);

const app = koa(config);
const mongooseClient = mongoose(config);
const redisClient = redis(config);

async function server() {
  try {
    await Promise.all([
      app.promise,
      mongooseClient.promise,
      redisClient.promise
    ]);

    logger.info(`${config.app.name} start success`);
  } catch (err) {
    logger.fatal('start failed', err);
  }
}

server();

process.on('uncaughtException', (err) => {
  logger.fatal('uncaughtException', err);
  process.nextTick(() => process.exit(1));
});
