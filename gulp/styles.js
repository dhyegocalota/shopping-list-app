'use strict';

var gulp  = require('gulp');
var paths = gulp.paths;
var $     = require('gulp-load-plugins')();

gulp.task('styles', function() {
  var lessOptions = {
    paths: [
      'bower_components',
      paths.src + '/app',
      paths.src + '/components'
    ]
  };

  var injectFiles = gulp.src([
    paths.src + '/{app,components}/**/*.less',
    '!' + paths.src + '/app/app.less',
    '!' + paths.src + '/app/vendor.less'
  ], { read: false })
    .pipe($.plumber());

  var injectOptions = {
    transform: function(filePath) {
      filePath = filePath.replace(paths.src + '/app/', '');
      filePath = filePath.replace(paths.src + '/components/', '../components/');
      return '@import \'' + filePath + '\';';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  var appFilter = $.filter('app.less');

  return gulp.src([
    paths.src + '/app/app.less',
    paths.src + '/app/vendor.less'
  ])
    .pipe($.plumber())
    .pipe(appFilter)
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(appFilter.restore())
    .pipe($.less())
    .pipe($.autoprefixer())
    .pipe($.plumber.stop())
    .pipe(gulp.dest(paths.tmp + '/serve/app/'));
});
