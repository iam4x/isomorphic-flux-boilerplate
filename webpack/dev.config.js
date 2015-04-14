'use strict';

import path from 'path';
import webpack from 'webpack';

import writeStats from './utils/write-stats';
import startKoa from './utils/start-koa';

const HOST = 'https://react-jaulz.c9.io';
const PORT = 443;
const WEBPACK_PORT = parseInt(process.env.PORT) + 1 || 3001;

export default {
  devtool: 'eval-source-map',
  host: HOST,
  port: WEBPACK_PORT,
  entry: {
    app: [
      `webpack-dev-server/client?http://localhost:${WEBPACK_PORT}`,
      'webpack/hot/only-dev-server',
      './app/index.js'
    ]
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name]-[chunkhash].js',
    publicPath: `${HOST}:${PORT}/assets/`
  },
  module: {
    preLoaders: [
      {
        test: /\.js$|.jsx$/,
        exclude: /node_modules/,
        loaders: ['eslint', 'jscs']
      }
    ],
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff|eot|ttf)$/,
        loader: 'url?limit=10000&name=[sha512:hash:base64:7].[ext]'
      },
      {
        test: /\.js$|.jsx$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel?experimental']
      },
      {
        test: /\.scss$/,
        loader: 'style!css?sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap'
      }
    ]
  },
  plugins: [

    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify('development')
      }
    }),

    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),

    function () { this.plugin('done', writeStats); },
    function () { this.plugin('done', startKoa); }

  ],
  resolve: {
    extensions: ['', '.js', '.json', '.jsx'],
    modulesDirectories: ['node_modules', 'app']
  }
}
