'use strict';

const mongoose = require('mongoose');
const logger = require('../utils/logger')(__filename);

module.exports = (config) => {
  const mongoConfig = config.mongo;
  const mongoStr = `mongodb://${mongoConfig.host}:${mongoConfig.port}/${config.app.name}`;

  mongoose.connect(mongoStr);
  const db = mongoose.connection;

  db.promise = new Promise((resolve, reject) => {
    db.once('open', () => {
      logger.info(`MongoDB open on ${mongoStr}`);
      resolve();
    });

    db.on('error', (err) => {
      logger.fatal('MongoDB error', err);
      reject(err);
    });

    db.on('connected', () => logger.info('MongoDB connected'));

    db.on('reconnected', () => logger.info('MongoDB reconnected'));

    db.on('disconnected', () => logger.fatal('MongoDB disconnected'));
  });

  return db;
};
