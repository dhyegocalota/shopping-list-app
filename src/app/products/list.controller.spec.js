'use strict';

describe('ProductsListController', function() {
  var Products;

  function controller() {
    var listController;
    inject(function($rootScope, $controller) {
      listController = $controller('ProductsListController', {
        $scope: $rootScope.$new()
      });
    });
    return listController;
  }

  beforeEach(module('shoppingListApp.products'));

  beforeEach(inject(function(_Products_) {
    Products = _Products_;
  }));

  describe('#products', function() {
    it('should be the return of Products#fetchAll', function() {
      spyOn(Products, 'fetchAll').and.returnValue(['a', 'b', 'c']);
      expect(controller().products).toEqual(['a', 'b', 'c']);
    });
  });

  describe('#productsAmount', function() {
    it('should be the return of Products#amountTotal', function() {
      spyOn(Products, 'amountTotal').and.returnValue(50.0);
      expect(controller().productsAmount).toBe(50.0);
    });
  });
});
