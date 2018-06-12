'use strict';

const { resolve, assetsPath, cssLoader, vueLoaderConf } = require('./utils');
const { dir } = require('../config');

module.exports = {
  context: resolve(dir.frontend),
  entry: {
    app: ['./main.js']
  },
  output: {
    path: resolve(`${dir.dist}/${dir.frontend}`),
    filename: assetsPath('js/[name].js'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConf
      },
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve(dir.frontend)],
        options: {
          emitWarning: true,
          configFile: 'frontend/.eslintrc.js'
        }
      },
      {
        test: /\.css$/,
        use: cssLoader()
      },
      {
        test: /\.styl$/,
        use: cssLoader('stylus')
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
};