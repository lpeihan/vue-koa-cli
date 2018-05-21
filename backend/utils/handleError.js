'use strict';

module.exports = (logger) => {
  return function(...args) {
    let ctx;
    let status;

    args.forEach((arg) => {
      if (arg.originalUrl) {
        ctx = arg;
      }

      if (typeof arg === 'number') {
        status = arg;
      }
    });

    if (ctx) {
      ctx.status = status || 500;
      ctx.body = args[0];
    }
    logger.error(...args);
  };
};
