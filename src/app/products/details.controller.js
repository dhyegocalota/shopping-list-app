(function() {
  'use strict';

angular.module('shoppingListApp.products')
  .controller('ProductsDetailsController', [
    '$routeParams',
    '$location',
    'Products',
    'product',
    ProductsDetailsController
  ]);

function ProductsDetailsController($routeParams, $location, Products, product) {
  var vm = this;

  vm.product = product;

  vm.persisted = angular.isDefined($routeParams.id);

  vm.save = function() {
    if (vm.persisted) {
      Products.update($routeParams.id, vm.product);
    } else {
      Products.add(vm.product);
    }
    $location.url('/products');
  };

  if (vm.persisted) {
    vm.remove = function() {
      Products.remove($routeParams.id);
      $location.url('/products');
    };
  }
}

}());
