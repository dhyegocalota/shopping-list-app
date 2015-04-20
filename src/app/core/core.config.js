(function() {
  'use strict';

angular.module('shoppingListApp.core')
  .config([
    '$routeProvider',
    CoreConfig
  ]);

function CoreConfig($routeProvider) {
  $routeProvider
    .otherwise({
      redirectTo: '/'
    });
}

}());
