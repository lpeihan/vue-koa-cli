'use strict';

const app = require('../package.json');

module.exports = {
  host: 'localhost',
  port: 8300,
  cookie: {
    keys: [
      'APdtVf2BKugFEPO0gWQgaT0GmbWge10ZvUnRAMgBLU',
      'JRhNhZ5ru9wNY1BEqtmvfClL2zxyIr7To12k5bySm8'
    ],
    maxAge: 60000 * 60 * 24 * 30,
    prefix: 's:',
    secure: false
  },
  mongo: {
    host: 'localhost',
    port: 27017
  },
  redis: {
    host: 'localhost',
    port: 6379,
    db: 0
  },
  log: {
    level: 'trace'
  },
  app
};
