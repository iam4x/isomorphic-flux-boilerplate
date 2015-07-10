/* eslint-disable */
var path = require('path');
var writeStats = require('./utils/write-stats');

var JS_REGEX = /\.js$|\.jsx$|\.es6$|\.babel$/;

module.exports = {
  devtool: 'source-map',
  entry: {
    app: './app/index.js'
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[hash].js',
    publicPath: '/assets/'
  },
  module: {
    preLoaders: [
      {
        test: JS_REGEX,
        exclude: /node_modules/,
        loader: 'eslint'
      }
    ],
    loaders: [
      {test: /\.json$/, exclude: /node_modules/, loader: 'json'},
      {test: JS_REGEX, exclude: /node_modules/, loader: 'babel'}
    ],
  },
  plugins: [
    // write webpack stats
    function() {
      this.plugin('done', writeStats);
    }
  ],
  resolve: {
    extensions: ['', '.js', '.json', '.jsx', '.es6', '.babel'],
    modulesDirectories: ['node_modules', 'app']
  }
};
