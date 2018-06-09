'use strict';

const log4js = require('log4js');
const path = require('path');

module.exports = (filename) => {
  const name = filename && path.relative('./', filename).replace(path.sep === '/' ? /\//g : /\\/g, '/');
  return log4js.getLogger(`[${name}]`);
};
