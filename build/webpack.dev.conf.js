'use strict';

const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const packageConfig = require('../package.json');
const baseWebpackConf = require('./webpack.base.conf');
const config = require('../config');

const {
  resolve
} = require('./utils');

module.exports = merge(baseWebpackConf, {
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"'
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      title: packageConfig.name,
      inject: true,
      favicon: resolve('frontend/favicon.ico')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [
          `Your application is running here ${config.host}:${config.port + 1} => ${config.port}`
        ]
      },
      onErrors: function(severity, errors) {
        if (severity !== 'error') {
          return;
        }
        const error = errors[0];
        const filename = error.file.split('!').pop();
        notifier.notify({
          title: packageConfig.name,
          message: severity + ': ' + error.name,
          subtitle: filename || '',
          icon: path.resolve(__dirname, 'logo.png')
        });
      }
    })
  ]
});
