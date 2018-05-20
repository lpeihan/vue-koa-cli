const gulp = require('gulp');
const webpack = require('webpack');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');
const path = require('path');
const open = require('open');

const packageConfig = require('../package.json');
const webpackDevConf = require('./webpack.dev.conf');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../config');

const url = `http://localhost:${config.port + 1}`;

webpackDevConf.entry.app.unshift(
  `webpack-dev-server/client?${url}`,
  'webpack/hot/dev-server'
);

gulp.task('webpack-dev-server', (done) => {
  const compiler = webpack(webpackDevConf);
  const server = new WebpackDevServer(compiler, {
    proxy: {
      '/api': `http://localhost:${config.port}`
    },
    hot: true,
    inline: true,
    open: true,
    compress: true,
    quiet: true,
    clientLogLevel: 'warning',
    overlay: {
      errors: true,
      warnings: false
    },
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join('/', 'index.html') }
      ]
    }
  });

  server.listen(config.port + 1, config.host, () => {
    open(url);
    done();
  });
});

gulp.task('nodemon', ['eslint:backend'], () => {
  nodemon({
    script: packageConfig.main,
    watch: [
      'backend/',
      'config/'
    ],
    ext: 'js',
    env: {
      NODE_ENV: 'development'
    }
  });
});

gulp.task('eslint:backend', () => {
  gulp.src([
    packageConfig.main,
    'backend/**/*.js',
    'config/**/*.js'
  ])
    .pipe(eslint({ configFile: '.eslintrc.js' }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('serve', [
  'nodemon',
  'webpack-dev-server'
]);
