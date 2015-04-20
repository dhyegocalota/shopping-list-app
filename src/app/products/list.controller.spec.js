'use strict';

describe('ProductsListController', function() {
  var Products;
  var $scope;

  function controller() {
    var listController;
    inject(function($rootScope, $controller) {
      $scope = $rootScope.$new();
      listController = $controller('ProductsListController', {
        $scope: $scope
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

    describe('when $scope is digested', function() {
      it('should be Products#amountTotal', function() {
        spyOn(Products, 'amountTotal').and.returnValues(10, 15);
        var listController = controller();
        expect(listController.productsAmount).toBe(10);

        $scope.$digest();
        expect(listController.productsAmount).toBe(15);
      });
    });
  });

  describe('#removeProduct', function() {
    it('should call Products#remove', function() {
      spyOn(Products, 'remove');
      controller().remove(1);
      expect(Products.remove).toHaveBeenCalledWith(1);
    });
  });
});
