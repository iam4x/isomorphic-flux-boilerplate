'use strict';

/* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
/* eslint camelcase: 0 */

require('babel/register');

var path = require('path');
var webpack = require('webpack');

var writeStats = require('./utils/write-stats');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: './app/index.js'
  },
  output: {
    path: path.join(__dirname, '../dist/js'),
    filename: '[name]-[hash].js',
    publicPath: '/assets/js/'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$|.jsx$/,
        exclude: /node_modules/,
        loaders: ['eslint-loader']
      }
    ],
    loaders: [
      {
        test: /\.js$|.jsx$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        sequences: true,
        dead_code: true,
        drop_debugger: true,
        comparisons: true,
        conditionals: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        hoist_funs: true,
        if_return: true,
        join_vars: true,
        cascade: true,
        drop_console: true
      },
      output: {
        comments: false
      }
    }),
    function () { this.plugin('done', writeStats); }
  ],
  resolve: {
    extensions: ['', '.js', '.json', '.jsx'],
    modulesDirectories: ['node_modules', 'app']
  }
};
