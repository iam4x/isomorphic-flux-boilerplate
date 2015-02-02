'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var supervisor = require('gulp-supervisor');
var proxy = require('proxy-middleware');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var webpackConfig = require('./webpack.config.js');

// +------------------+
// | DEVLOPMENT TASKS |
// +------------------+

// Proxy `/assets/javascript/` requests to
// served files from `webpack-dev-server`
var webpackProxy = function () {
  var url = require('url');
  var options = url.parse('http://localhost:8090/assets/javascript');
  options.route = '/assets/javascript/';
  return proxy(options);
};

// Proxy `/` to the `express` server started
var expressProxy = function () {
  var url = require('url');
  var options = url.parse('http://localhost:3000');
  options.route = '/';
  return proxy(options);
};

gulp.task('connect', function () {
  connect.server({
    root: __dirname,
    middleware: function () {
      return [webpackProxy(), expressProxy()];
    }
  });
});

gulp.task('webpack-dev-server', function () {
  var config = Object.create(webpackConfig);
  config.devtool = 'eval';
  config.debug = true;
  config.entry = [
    'webpack-dev-server/client?http://localhost:8090',
    'webpack/hot/only-dev-server',
    __dirname + '/app/bundle.jsx'
  ];
  config.module.loaders = [
    {test: /\.jsx$/, loaders: ['react-hot', 'jsx?harmony'], exclude: /node_modules/}
  ];
  config.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ];

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath
  }).listen(8090, 'localhost', function (err) {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    gutil.log('[webpack-dev-server]', 'started on port 8090');
  });
});

gulp.task('supervisor', function () {
  supervisor('server.js', {
    watch: ['views', 'server.js', 'router.jsx'],
    extensions: ['jsx', 'js']
  });
});

gulp.task('dev', ['supervisor', 'webpack-dev-server', 'connect']);
