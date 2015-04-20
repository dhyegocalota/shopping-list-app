(function() {
  'use strict';

angular.module('shoppingListApp.products')
  .controller('ProductsListController', [
    'Products',
    ProductsListController
  ]);

function ProductsListController(Products) {
  var vm = this;

  function freshProducts() {
    vm.products = Products.fetchAll();
    vm.productsAmount = Products.amountTotal();
  }

  freshProducts();
}

}());
