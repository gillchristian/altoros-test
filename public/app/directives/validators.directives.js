(function(){
'use strict';
  /**
   * Validate name directive module
   */
  angular.module('validators', ['ecommerceApp.services'])
    .directive('range', range)
    .directive('checkProductName', checkProductName);

  // --- validates an input range ---
  function range($log) {
      return {
        require: "ngModel",
        restrict: "A",
        scope: {
          rMin: '=',
          rMax: '='
        },
        link: function postLink(scope, elm, attrs, ctrl) {

          ctrl.$validators.range = function(modelValue, viewValue) {
            if (ctrl.$isEmpty(modelValue)) return true;
            var min = scope.rMin > parseInt(viewValue);
            var max = scope.rMax < parseInt(viewValue);
            return min || max ? false : true;
          };
        }
      };
  }

  checkProductName.$inject = ['productService', '$q'];

  // --- Async validation for name availability ---
  function checkProductName(productService, $q) {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        productId: '='
      },
      link: function postLink(scope, elm, attrs, ctrl) {
        ctrl.$asyncValidators.checkProductName = function(modelValue, viewValue) {

          var deferred = $q.defer();
          var name = modelValue || viewValue;
          if ( ctrl.$isEmpty(name) ) {
            // consider empty model valid
            deferred.resolve()
          }
          productService.checkName(name, scope.productId)
            .then(
              // --- set validity by resolving or rejecting,
              // --- respectively, the promise
              function(){ deferred.resolve() },
              function (){ deferred.reject() }
            )
          return deferred.promise;
        }
      }
    }
  };

})();
