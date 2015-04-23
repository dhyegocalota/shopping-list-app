(function() {
  'use strict';

angular.module('shoppingListApp.products')
  .factory('Products', [ProductsFactory]);

function ProductsFactory() {
  var products = [];

  return {
    add: add,
    update: update,
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

  function update(id, attributes) {
    var product = this.fetch(id);
    if (!product) {
      throw new Error('Product not found');
    }
    if (angular.isUndefined(attributes) || !angular.isObject(attributes)) {
      return false;
    }
    products[id] = angular.extend(product, attributes);
    return true;
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
    var product = this.fetch(id);

    if(product) {
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
