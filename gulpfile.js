'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var nodemon = require('gulp-nodemon');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');

var bundler = watchify(browserify('./app/app.jsx', watchify.args));
// add any other browserify options or transforms here
bundler.transform(['reactify', {es6: true}]);

var bundle = function () {
  return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'));
};

bundler.on('update', bundle);
gulp.task('browserify', bundle);

gulp.task('nodemon', function () {
  nodemon({
    script: 'server.js',
    ext: 'html js handlebars'
  });
});

gulp.task('default', ['browserify', 'nodemon'], function () {
  gulp.watch('app/**/*.jsx', ['browserify']);
});
