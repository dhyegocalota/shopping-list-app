'use strict';

var gulp  = require('gulp');
var gutil = require('gulp-util');

gulp.paths = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e'
};

require('require-dir')('./gulp');

gulp.task('default', ['build']);
