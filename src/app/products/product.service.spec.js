'use strict';

describe('ProductsService', function() {
  var Products;

  beforeEach(module('shoppingListApp.products'));

  beforeEach(inject(function(_Products_) {
    Products = _Products_;
  }));

  describe('#fetchAll', function() {
    describe('when there any product', function() {
      it('should return an empty array', function() {
        expect(Products.fetchAll()).toEqual([]);
      });
    });

    describe('when there are some products', function() {
      beforeEach(function() {
        Products.add({
          name: 'a',
          price: 9.99,
          quantity: 1
        });
        Products.add({
          name: 'b',
          price: 5.0,
          quantity: 2
        });
      });

      it('should return all products', function() {
        expect(Products.fetchAll()).toEqual([
          {
            name: 'a',
            price: 9.99,
            quantity: 1
          },
          {
            name: 'b',
            price: 5.0,
            quantity: 2
          }
        ]);
      });
    });
  });

  describe('#add', function() {
    beforeEach(function() {
      expect(Products.fetchAll()).toEqual([]);
    });

    it('should add the product based on the given arguments', function() {
      Products.add({
        name: 'a',
        price: 9.50,
        quantity: 10
      });
      expect(Products.fetchAll()).toEqual([
        {
          name: 'a',
          price: 9.50,
          quantity: 10
        }
      ]);
    });

    it('should return Products itself', function() {
      expect(Products.add()).toBe(Products);
    });
  });

  describe('#remove', function() {
    beforeEach(function() {
      expect(Products.fetchAll()).toEqual([]);
    });

    describe('when the product does not exist', function() {
      it('should not throw', function() {
        expect(function() {
          Products.remove(99);
        }).not.toThrow();
      });

      it('should return false', function() {
        expect(Products.remove(99)).toBe(false);
      });
    });

    describe('when the product does exist', function() {
      beforeEach(function() {
        Products.add({
          name: 'a',
          price: 9.99,
          quantity: 1
        });
        Products.add({
          name: 'b',
          price: 5.0,
          quantity: 2
        });
      });

      it('should remove the product', function() {
        Products.remove(0);
        expect(Products.fetchAll()).toEqual([
          {
            name: 'b',
            price: 5.0,
            quantity: 2
          }
        ]);
      });

      it('should return true', function() {
        expect(Products.remove(0)).toBe(true);
      });
    });
  });

  describe('#fetch', function() {
    beforeEach(function() {
      expect(Products.fetchAll()).toEqual([]);
    });

    describe('when the product does not exist', function() {
      it('should return undefined', function() {
        expect(Products.fetch(99)).toBeUndefined();
      });
    });

    describe('when the product does exist', function() {
      beforeEach(function() {
        Products.add({
          name: 'a',
          price: 9.99,
          quantity: 1
        });
        Products.add({
          name: 'b',
          price: 5.0,
          quantity: 2
        });
      });

      it('should return the product', function() {
        expect(Products.fetch(0)).toEqual({
          name: 'a',
          price: 9.99,
          quantity: 1
        });
        expect(Products.fetch(1)).toEqual({
          name: 'b',
          price: 5.0,
          quantity: 2
        });
      });
    });
  });

  describe('#amount', function() {
    beforeEach(function() {
      expect(Products.fetchAll()).toEqual([]);
    });

    describe('when the product does not exist', function() {
      it('should return undefined', function() {
        expect(Products.amount(99)).toBeUndefined();
      });
    });

    describe('when the product does exist', function() {
      beforeEach(function() {
        Products.add({
          name: 'a',
          price: 9.99,
          quantity: 1
        });
        Products.add({
          name: 'b',
          price: 5.0,
          quantity: 2
        });
      });

      it('should return the price amount of the product', function() {
        expect(Products.amount(0)).toBe(9.99);
        expect(Products.amount(1)).toBe(10.0);
      });
    });
  });

  describe('#amountTotal', function() {
    describe('when there any product', function() {
      beforeEach(function() {
        expect(Products.fetchAll()).toEqual([]);
      });

      it('should return 0', function() {
        expect(Products.amountTotal()).toBe(0);
      });
    });

    describe('when there are some products', function() {
      beforeEach(function () {
        Products.add({
          name: 'a',
          price: 15.45,
          quantity: 1
        });
        Products.add({
          name: 'b',
          price: 5.0,
          quantity: 2
        });
      });

      it('should return the amount of all products', function() {
        expect(Products.amountTotal()).toBe(25.45);
      });
    });
  });
});
