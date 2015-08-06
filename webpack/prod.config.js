/* eslint-disable */
require('babel/register');

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var baseConfig = require('./base.config');
var cssnext = require('cssnext');

// clean `.tmp` && `dist`
require('./utils/clean-dist')();

var config = Object.assign({}, baseConfig);

config.module.loaders = config.module.loaders.concat([
  {
    test: /\.(woff|eot|ttf)$/,
    loader: 'file?name=[sha512:hash:base64:7].[ext]'
  },
  {
    test: /\.(jpe?g|png|gif|svg)$/,
    loader: 'file?name=[sha512:hash:base64:7].[ext]!image?optimizationLevel=7&progressive&interlaced'
  },
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
  }
]);

config.postcss = [
  cssnext({browsers: 'last 2 versions'})
];

config.plugins = [
  // extract css
  new ExtractTextPlugin('[name]-[chunkhash].css'),

  // set env
  new webpack.DefinePlugin({
    'process.env': {
      BROWSER: JSON.stringify(true),
      NODE_ENV: JSON.stringify('production')
    }
  }),

  // optimizations
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
  })
].concat(config.plugins);

module.exports = config;
