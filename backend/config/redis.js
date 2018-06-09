'use strict';

const redis = require('redis');
const coRedis = require('co-redis');
const logger = require('../utils/logger')(__filename);

module.exports = (config) => {
  const redisConfig = config.redis;

  const client = coRedis(redis.createClient(redisConfig.port, redisConfig.host));

  client.promise = new Promise((resolve, reject) => {
    redisConfig.auth && client.auth(redisConfig.auth, (err) => {
      err && reject(err);
    });

    client.on('ready', () => {
      logger.info(`Redis ready on ${redisConfig.host}:${redisConfig.port}`);
      resolve(client);
    });

    client.on('connect', () => {
      const db = redisConfig.db || 0;
      logger.info(`Redis connected db${db}`);
      if (db) {
        client.send_anyways = true;
        client.select(db);
        client.send_anyways = false;
      }
    });

    client.on('reconnecting', () => logger.warn('Redis reconnecting'));

    client.on('error', err => {
      logger.fatal('Redis error', err);
      reject(err);
    });
  });

  return client;
};
