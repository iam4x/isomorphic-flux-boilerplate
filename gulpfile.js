'use strict';

/* eslint camelcase: 0 */

var gulp = require('gulp');
var path = require('path');
var del = require('del');
var browserSync = require('browser-sync');
var pngquant = require('imagemin-pngquant');
var proxy = require('proxy-middleware');
var webpack = require('webpack');
var karma = require('karma').server;
var WebpackDevServer = require('webpack-dev-server');
var objectAssign = require('react/lib/Object.assign');
var runSequence = require('run-sequence');

// load gulp plugins
var $ = require('gulp-load-plugins')();

var webpackConfig = require('./webpack.config.js');

var CODE_FILES = [
  'app/**/*.jsx',
  'app/**/*.js',
  'shared/**/*.js',
  'server/**/*.jsx',
  'server/**/*.js',
  'test/**/*.jsx',
  'test/**/*.js'
];

// +--------------+
// | SHARED TASKS |
// +--------------+

gulp.task('clean', del.bind(null, ['.tmp', 'dist/*'], {dot: true}));

gulp.task('lint:code', function () {
  return gulp.src(CODE_FILES)
  .pipe($.plumber())
  .pipe($.jscs())
  .pipe($.lintspaces({
    editorconfig: '.editorconfig'
  }))
  .pipe($.lintspaces.reporter())
  .pipe($.eslint({
    useEslintrc: true
  }))
  .pipe($.eslint.format());
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
    }
  });
});

gulp.task('webpack-dev-server', function (done) {
  var config = objectAssign({}, webpackConfig);
  config.devtool = 'source-map';
  config.debug = true;
  config.entry = [
    'webpack-dev-server/client?http://localhost:8090',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '/app/index.js')
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
    hot: true,
    color: true,
    stats: {
      assets: true,
      colors: true,
      version: false,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false
    }
  }).listen(8090, 'localhost', function (err) {
    if (err) {
      throw new $.util.PluginError('webpack-dev-server', err);
    }
    $.util.log('[webpack-dev-server]', 'started on port 8090');
    return done();
  });
});

gulp.task('server', function (done) {
  // thank's https://github.com/kriasoft/react-starter-kit/blob/master/gulpfile.js#L127
  var started = false;
  var cp = require('child_process');
  var assign = require('react/lib/Object.assign');

  var server = (function startup() {
    var child = cp.fork('server/index.js', {
      env: assign({NODE_ENV: 'development'}, process.env)
    });
    child.once('message', function(message) {
      if (message.match(/^online$/)) {
        if (browserSync) {
          browserSync.reload();
        }
        if (!started) {
          started = true;
          gulp.watch(['server/**/*'], function () {
            $.util.log('Restarting development server.');
            server.kill('SIGTERM');
            server = startup();
          });
          done();
        }
      }
    });
    return child;
  })();

  process.on('exit', function() {
    server.kill('SIGTERM');
  });
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/img'))
    .pipe($.size());
});

gulp.task('sass', function () {
  return gulp.src('app/styles/**/*.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({errLogToConsole: true}))
    .pipe($.autoprefixer())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/css'));
});

gulp.task('styles', ['sass'], function () {
  return gulp.src('.tmp/css/**/*.css')
    .pipe($.concatCss('styles.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('test:watch', function (done) {
  karma.start({configFile: path.join(__dirname, 'karma.conf.js')}, done);
});

gulp.task('dev', ['clean'], function () {
  runSequence(
    ['images', 'styles'],
    ['server', 'webpack-dev-server'],
    'connect',
    function () {
      gulp.watch(CODE_FILES, ['lint:code']);
      gulp.watch('app/images/**/*', ['images']);
      gulp.watch('app/styles/**/*', ['styles']);
    }
  );
});

// +-------------+
// | BUILD TASKS |
// +-------------+

gulp.task('webpack:build', function (done) {
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
      throw new $.util.PluginError('webpack:build', err);
    }
    $.util.log('[webpack:build]', stats.toString({colors: true}));
    return done();
  });
});

gulp.task('build:styles', ['styles'], function () {
  return gulp.src('dist/css/styles.css')
    .pipe($.minifyCss())
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('test:build', function (done) {
  karma.start({
    configFile: path.join(__dirname, 'karma.conf.js'),
    singleRun: true
  }, done);
});

gulp.task('build', ['clean'], function (done) {
  runSequence([
    'build:styles',
    'images',
    'lint:code',
    'test:build'
  ], 'webpack:build', done);
});
