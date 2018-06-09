'use strict';

const path = require('path');
const log4js = require('log4js');

const { map } = require('lodash');

const ALL_LEVELS = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];

module.exports = (config) => {
  const appenders = {
    console: {
      type: 'console'
    }
  };

  ALL_LEVELS.slice(ALL_LEVELS.indexOf(config.log.level.toLowerCase()))
    .forEach((level) => {
      appenders[`_dateFile${level}`] = {
        type: 'dateFile',
        filename: path.join('logs', `${config.app.name}-${level}`),
        pattern: '-yyyy-MM-dd.log',
        alwaysIncludePattern: true
      };

      appenders[level] = {
        type: 'logLevelFilter',
        level: level.toUpperCase(),
        maxLevel: level.toUpperCase(),
        appender: `_dateFile${level}`
      };
    });

  log4js.configure({
    categories: {
      default: {
        appenders: map(appenders, (appender, name) => name).filter(name => name[0] !== '_'),
        level: config.log.level
      }
    },
    appenders
  });
};
