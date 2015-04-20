(function() {
  'use strict';

angular.module('shoppingListApp.products')
  .config([
    '$routeProvider',
    ProductsConfig
  ]);

function ProductsConfig($routeProvider) {
  $routeProvider
    .when('/', {
      redirectTo: '/products'
    })
    .when('/products', {
      controller: 'ProductsListController as productsVm',
      templateUrl: 'app/products/list.html'
    })
    .when('/products/add', {
      controller: 'ProductsDetailsController as productVm',
      templateUrl: 'app/products/details.html',
      resolve: {
        product: ['$q', function($q) {
          return $q(function(resolve) {
            resolve({});
          });
        }]
      }
    })
    .when('/products/:id', {
      controller: 'ProductsDetailsController as productVm',
      templateUrl: 'app/products/details.html',
      resolve: {
        product: ['$q', '$route', 'Products', function($q, $route, Products) {
          return $q(function(resolve, reject) {
            var product;
            if (product = Products.fetch($route.current.params.id)) {
              resolve(product);
            } else {
              reject();
            }
          });
        }]
      }
    });
}

}());
