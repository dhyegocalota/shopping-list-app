'use strict';

describe('ProductsDetailsController', function() {
  function controller(dependencies) {
    var detailsController;
    inject(function($controller) {
      detailsController = $controller('ProductsDetailsController', angular.extend({
        product: {}
      }, dependencies || {}));
    });
    return detailsController;
  }

  beforeEach(module('shoppingListApp.products'));

  describe('#persisted', function() {
    var detailsController;

    describe('when there is no routeParam called `id`', function() {
      beforeEach(function() {
        detailsController = controller({
          $routeParams: {}
        });
      });

      it('should be false', function() {
        expect(detailsController.persisted).toBe(false);
      });
    });

    describe('when there is a routeParam called `id`', function() {
      beforeEach(function() {
        detailsController = controller({
          $routeParams: {
            id: 1
          }
        });
      });

      it('should be true', function() {
        expect(detailsController.persisted).toBe(true);
      });
    });
  });

  describe('#product', function() {
    it('should be the `product` dependency injection', function() {
      var detailsController = controller({
        product: {
          name: 'a',
          price: 9.5,
          quantity: 3
        }
      });
      expect(detailsController.product).toEqual({
        name: 'a',
        price: 9.5,
        quantity: 3
      });
    });
  });

  describe('#save', function() {
    var Products;
    var detailsController;

    beforeEach(inject(function(_Products_) {
      Products = _Products_;
      detailsController = controller();
    }));

    it('should redirect to /products', inject(function($location) {
      expect($location.url()).toBe('');
      detailsController.save();
      expect($location.url()).toBe('/products');
    }));

    describe('when the product is not persisted', function() {
      beforeEach(function() {
        spyOn(Products, 'add');
      });

      it('should call Products#add', function() {
        detailsController.product = {
          name: 'a',
          price: 9.99,
          quantity: 1
        };
        detailsController.save();
        expect(Products.add).toHaveBeenCalledWith({
          name: 'a',
          price: 9.99,
          quantity: 1
        });
      });
    });

    describe('when the product is persisted', function() {
      beforeEach(function() {
        spyOn(Products, 'update');
        detailsController = controller({
          $routeParams: {
            id: 1
          },
          product: {
            name: 'a',
            price: 9.99,
            quantity: 1
          }
        });
      });

      it('should call Products#update', function() {
        detailsController.save();
        expect(Products.update).toHaveBeenCalledWith(1, {
          name: 'a',
          price: 9.99,
          quantity: 1
        });
      });
    });
  });

  describe('#remove', function() {
    var detailsController;

    beforeEach(function() {
      detailsController = controller();
    });

    describe('when the product is not persisted', function() {
      it('should be undefined', function() {
        expect(detailsController.remove).toBeUndefined();
      });
    });

    describe('when the product is persisted', function() {
      var Products;

      beforeEach(inject(function(_Products_) {
        Products = _Products_;
        spyOn(Products, 'remove');
        detailsController = controller({
          $routeParams: {
            id: 1
          }
        });
      }));

      it('should not be undefined', function() {
        expect(detailsController.remove).not.toBeUndefined();
      });

      it('should call Products#remove', function() {
        detailsController.remove();
        expect(Products.remove).toHaveBeenCalledWith(1);
      });

      it('should redirect to /products', inject(function($location) {
        expect($location.url()).toBe('');
        detailsController.remove();
        expect($location.url()).toBe('/products');
      }));
    });
  });
});
