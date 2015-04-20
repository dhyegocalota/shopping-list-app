(function() {
  'use strict';

angular.module('shoppingListApp.products')
  .factory('Products', [ProductsFactory]);

function ProductsFactory() {
  var products = [];

  return {
    add: add,
    remove: remove,
    fetchAll: fetchAll,
    fetch: fetch,
    amount: amount,
    amountTotal: amountTotal
  };

  function add(product) {
    products.push(product);
    return this;
  }

  function remove(id) {
    if (this.fetch(id)) {
      products.splice(id, 1);
      return true;
    }
    return false;
  }

  function fetchAll() {
    return products;
  }

  function fetch(id) {
    return products[id];
  }

  function amount(id) {
    var product;
    if (product = this.fetch(id)) {
      return product.price * product.quantity;
    }
  }

  function amountTotal() {
    return products
      .map(function(product) {
        return product.price * product.quantity;
      })
      .reduce(function(previousAmount, currentAmount) {
        return previousAmount + currentAmount;
      }, 0);
  }
}

}());
