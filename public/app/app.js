(function(){
'use strict';
	/**
	 * Modulo principal
	 */
	angular.module('ecommerceApp', [ 'ui.router', 'ui.bootstrap', 'validators', 'authService', 'ecommerceApp.services', 'ecommerceApp.cart', 'ecommerceApp.admin'])

  .config(function($httpProvider) {
    // attach auth interceptor to the http requests
    $httpProvider.interceptors.push('AuthInterceptor');
  });

})();
