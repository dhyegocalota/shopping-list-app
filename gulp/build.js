'use strict';

var gulp  = require('gulp');
var paths = gulp.paths;

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('build:partials', function() {
  return gulp.src([
    paths.src + '/{app,components}/**/*.html',
    paths.tmp + '/{app,components}/**/*.html'
  ])
    .pipe($.plumber())
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'shoppingListApp'
    }))
    .pipe(gulp.dest(paths.tmp + '/partials/'));
});

gulp.task('build:html', ['inject', 'build:partials'], function() {
  var partialsInjectFile = gulp.src(paths.tmp + '/partials/templateCacheHtml.js', { read: false })
    .pipe($.plumber());
  var partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: paths.tmp + '/partials',
    addRootSlash: false
  };

  var htmlFilter = $.filter('*.html');
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');
  var assets;

  return gulp.src(paths.tmp + '/serve/*.html')
    .pipe($.plumber())
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    .pipe(assets = $.useref.assets())
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify({preserveComments: $.uglifySaveLicense}))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(htmlFilter.restore())
    .pipe(gulp.dest(paths.dist + '/'))
    .pipe($.size({ title: paths.dist + '/', showFiles: true }));
});

gulp.task('build:images', function() {
  return gulp.src(paths.src + '/assets/image/**/*')
    .pipe($.plumber())
    .pipe(gulp.dest(paths.dist + '/assets/image/'));
});

gulp.task('build:fonts', function() {
  return gulp.src($.mainBowerFiles())
    .pipe($.plumber())
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2,otf}'))
    .pipe($.flatten())
    .pipe(gulp.dest(paths.dist + '/fonts/'));
});

gulp.task('build:misc', function() {
  return gulp.src([
    //paths.src + '/.htaccess',
    paths.src + '/apple-touch-icon-*.png',
    paths.src + '/favicon.{ico,png}'
  ])
    .pipe($.plumber())
    .pipe(gulp.dest(paths.dist + '/'));
});

gulp.task('build:clean', function(done) {
  $.del([paths.dist + '/', paths.tmp + '/'], done);
});

gulp.task('build', ['build:clean'], function() {
  gulp.start(['build:html', 'build:images', 'build:fonts', 'build:misc']);
});
