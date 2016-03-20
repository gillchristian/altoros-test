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
            var value = modelValue || viewValue;
            if (ctrl.$isEmpty(value)) return true;
            var min = scope.rMin > parseInt(value);
            var max = scope.rMax < parseInt(value);
            return !(min || max);
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

          var name = modelValue || viewValue;
          if ( ctrl.$isEmpty(name) ) {
            // consider empty model valid
            return $q.when()
          }
          return productService.isUniqueName(name, scope.productId)
        }
      }
    }
  };

})();
