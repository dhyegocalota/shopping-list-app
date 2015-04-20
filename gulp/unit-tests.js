'use strict';

var gulp    = require('gulp');
var $       = require('gulp-load-plugins')();
var wiredep = require('wiredep');
var paths   = gulp.paths;

function runTests(singleRun, done) {
  var bowerDeps = wiredep({
    directory: 'bower_components',
    dependencies: true,
    devDependencies: true
  });

  var testFiles = bowerDeps.js.concat([
    paths.src + '/{app,components}/**/!(*.config|*.controller|*.service|*.directive|*.filter|*.routes).js',
    paths.src + '/{app,components}/**/!(*.spec|*.mocks).js',
    paths.src + '/{app,components}/**/*.mocks.js',
    paths.src + '/{app,components}/**/*.js'
  ]);

  gulp.src(testFiles)
    .pipe($.plumber())
    .pipe($.karma({
      configFile: 'karma.conf.js',
      action: (singleRun) ? 'run': 'watch'
    }));
}

gulp.task('test', ['scripts'], runTests.bind(this, true));
gulp.task('test:auto', ['scripts'], runTests.bind(this, false));
