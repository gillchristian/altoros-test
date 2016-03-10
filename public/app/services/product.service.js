(function() {
'use strict';

	angular
	.module('ecommerceApp.services')
	.factory('productService', productService);

	productService.$inject = ['$http', '$q'];

	function productService($http, $q) {

    return {
      getAll: getAll,
      add: add,
      update: update,
      remove: remove,
      checkName: checkName,
    }

		/////////////////////////
		/**
		 * Returns the products list
     *
     * @returns {object}  promise
		 */
		function getAll() {
      return $http({
        method: 'GET',
        url: '/api/products'
      }).then(
        function(response){
          return response.data
        },
        function(error){
          return error
        });
    };

		/**
		 * Adds a product
		 *
		 * @param {object} product to add
     * @returns {object}  promise
		 */
		function add(product){
      return $http({
        method: 'POST',
        url: '/api/products',
        data: product,
      }).then(
        function(response){
          return response.data
        },
        function(error){
          return error
        });
		}

		/**
		 * Updates a product
		 *
		 * @param {object}  product
     * @returns {object}  promise
		 */
		function update(product){
      return $http({
        method: 'PUT',
        url: '/api/products/' + product.id,
        data: product,
      })
      .then(
        function(response){
          return response.data
        },
        function(error){
          return error
        });
		}

		/**
		 * Removes a product
		 *
		 * @param {int}  id  product to remove
     * @returns {object}  promise
		 */
		function remove(id){
      return $http({
        method: 'DELETE',
        url: '/api/products/' + id
      }).then(
        function(response){
          return response.data
        },
        function(error){
          return error
        });
		}

    /**
     * Checks if a product name is already taken
     *
     * @param {string}  name
     * @returns {object}  promise
     */
    function checkName(name, id) {
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: '/api/products/check',
        data: {name: name, id: id}
      }).then(
        function(response){
          if (response.data.available) deferred.resolve()
          else deferred.reject()
        }, function (error) {
          deferred.reject()
        });
      return deferred.promise
    }
	}
})();
