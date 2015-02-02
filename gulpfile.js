'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var nodemon = require('gulp-nodemon');
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
      return [expressProxy(), webpackProxy()];
    }
  });
});

gulp.task('webpack-dev-server', function () {
  var compiler = webpack(webpackConfig);
  new WebpackDevServer(compiler)
    .listen(8090, 'localhost', function (err) {
      if (err) {
        throw new gutil.PluginError('webpack-dev-server', err);
      }
      gutil.log('[webpack-dev-server]', 'started on port 8090');
    });
});

gulp.task('nodemon', function () {
  nodemon({
    script: 'server.js',
    ext: 'html js handlebars'
  });
});

gulp.task('dev', ['webpack-dev-server', 'nodemon', 'connect']);
