'use strict';

describe('Cart module, controller', ()=>{
  beforeEach(module('ecommerceApp'))

  var CartController, productService, cartService, $uibModal, $q, deferred;

  beforeEach(inject( ($controller, productService, cartService, $uibModal, _$q_)=>{
    $q = _$q_;
    deferred = $q.defer();
    spyOn(productService, 'getAll').and.returnValue(deferred.promise);

    CartController = $controller('CartController', {

    })

  }))

})
