(function() {
  'use strict';

angular.module('shoppingListApp.products')
  .controller('ProductsListController', [
    '$scope',
    'Products',
    ProductsListController
  ]);

function ProductsListController($scope, Products) {
  var vm = this;

  vm.products = Products.fetchAll();
  vm.productsAmount = Products.amountTotal();

  vm.remove = function(id) {
    Products.remove(id);
  };

  $scope.$watchCollection(function() {
    return vm.products;
  }, function() {
    vm.productsAmount = Products.amountTotal();
  });
}

}());
