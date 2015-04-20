'use strict';

module.exports = function(config) {
  config.set({
    autoWatch : false,

    usePolling: true,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    reporters: ['growl', 'nyan'],

    plugins : [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-nyan-reporter',
      'karma-growl-reporter'
    ]
  });
};
