'use strict';

var gulp = require('gulp');
var del = require('del');
var gutil = require('gulp-util');
var size = require('gulp-size');
var browserSync = require('browser-sync');
var supervisor = require('gulp-supervisor');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var concatCss = require('gulp-concat-css');
var pngquant = require('imagemin-pngquant');
var proxy = require('proxy-middleware');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var objectAssign = require('object-assign');

var webpackConfig = require('./webpack.config.js');

// +--------------+
// | SHARED TASKS |
// +--------------+

gulp.task('clean', function () {
  return del([__dirname + '/dist/**/*']);
});

// +-------------------+
// | DEVELOPMENT TASKS |
// +-------------------+

// Proxy `/assets/javascript/` requests to
// served files from `webpack-dev-server`
var webpackProxy = function () {
  var url = require('url');
  var options = url.parse('http://localhost:8090/assets/js');
  options.route = '/assets/js/';
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
  browserSync({
    port: 8080,
    server: {
      baseDir: __dirname,
      middleware: [
        webpackProxy(),
        expressProxy()
      ]
    },
  });
});

gulp.task('webpack-dev-server', function () {
  var config = objectAssign({}, webpackConfig);
  config.devtool = 'source-map';
  config.debug = true;
  config.entry = [
    'webpack-dev-server/client?http://localhost:8090',
    'webpack/hot/only-dev-server',
    __dirname + '/app/index.js'
  ];
  config.module.loaders = [{
    test: /\.js/,
    loaders: ['react-hot', 'babel-loader'],
    exclude: /node_modules/
  }];
  config.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ];

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true
  }).listen(8090, 'localhost', function (err) {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    gutil.log('[webpack-dev-server]', 'started on port 8090');
  });
});

gulp.task('supervisor', function () {
  supervisor(__dirname + '/server/index.js', {
    watch: ['server'],
    extensions: ['jsx', 'js']
  });
});

gulp.task('images', function () {
  return gulp.src(__dirname + '/app/images/**/*')
    .pipe(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(__dirname + '/dist/img'))
    .pipe(size());
});

gulp.task('sass', function () {
  return gulp.src(__dirname + '/app/styles/**/*.scss')
    .pipe(sass({errLogToConsole: true}))
    .pipe(gulp.dest(__dirname + '/.tmp/css'));
});

gulp.task('styles', ['sass'], function () {
  return gulp.src(__dirname + '/.tmp/css/**/*.css')
    .pipe(concatCss('styles.css'))
    .pipe(gulp.dest(__dirname + '/dist/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('dev', [
  'clean',
  'images',
  'styles',
  'supervisor',
  'webpack-dev-server',
  'connect'
], function () {
  gulp.watch(__dirname + '/app/images/**/*', ['images']);
  gulp.watch(__dirname + '/app/styles/**/*', ['styles']);
});

// +-------------+
// | BUILD TASKS |
// +-------------+

gulp.task('webpack:build', function (callback) {
  var config = objectAssign({}, webpackConfig);
  config.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
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
      },
      sourceMap: false
    })
  ];

  webpack(config, function (err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack:build', err);
    }
    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));
    return callback();
  });
});

gulp.task('build:styles', ['styles'], function () {
  return gulp.src(__dirname + '/dist/css/styles.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest(__dirname + '/dist/css/'));
});

gulp.task('build', ['clean', 'build:styles', 'images', 'webpack:build']);
