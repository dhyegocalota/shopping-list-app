(function() {
  'use strict';

angular.module('shoppingListApp.products')
  .config(['$routeProvider', ProductsConfig]);

function ProductsConfig($routeProvider) {
  $routeProvider
    .when('/', {
      redirectTo: '/products'
    })
    .when('/products', {
      controller: 'ProductsListController as productsVm',
      templateUrl: 'app/products/list.html'
    })
    .when('/products/:id', {
      controller: 'ProductsDetailsController as productVm',
      templateUrl: 'app/products/details.html'
    });
}

}());
