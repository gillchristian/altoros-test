(function() {
'use strict';

	angular
	.module('ecommerceApp.services')
	.factory('iconService', iconService);

	iconService.$inject = ['$http', '$window'];


	function iconService($http, $window) {

    return { getIcons: getIcons };

    /////////////////////////
    /**
     * Retrives a list of all the font awesome icons classes
     *
     * @returns {object}  promise
     */
		function getIcons() {
			return $http({
				method: 'GET',
				url: '/api/icons'
			})
      .then(function(response){
        return response.data
      })
      .catch(function(error){
        return error
      });
		}
	}
})();
