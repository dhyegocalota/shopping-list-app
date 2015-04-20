'use strict';

var gulp  = require('gulp');
var paths = gulp.paths;
var $     = require('gulp-load-plugins')();

gulp.task('scripts', function() {
  return gulp.src(paths.src + '/{app,components}/**/*.js')
    .pipe($.plumber())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});
