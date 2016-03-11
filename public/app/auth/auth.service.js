(function(){
'use strict';

  angular.module('authService', [])
    .factory('Auth', Auth)
    .factory('AuthToken', AuthToken)
    .factory('AuthInterceptor', AuthInterceptor)


  Auth.$inject = ['$http', '$q', 'AuthToken']
  /**
   * Handles login and authentificando
   */
  function Auth($http, $q, AuthToken) {

    return {
      login: login,
      logout: logout,
    };

    /**
     * Do login for the sample user
     */
    function login() {
      // return the promise object and its data
      return $http ({
        method: 'POST',
        url: '/api/authenticate',
        params: {
          email: 'altoros@altoros',
          password: 'password'
        }
      })
      .then(function(response) {
        AuthToken.setToken(response.data.token);
      })
    }

    /**
     * Log out by clearing the token
     */
    function logout() {
      // clear the token
      AuthToken.setToken();
    }

  }

  AuthToken.$inject = ['$window'];
  /**
   * Provides an easy way to get / remove the token
   */
  function AuthToken($window) {

    return {
      getToken: getToken,
      setToken: setToken,
    };

    /**
     * Grab token from local storage
     */
    function getToken() {
      return $window.localStorage.getItem('token');
    };

    /**
     * Set or clear token
     */
    function setToken(token) {
      if (token)
        $window.localStorage.setItem('token', token);
      else
        $window.localStorage.removeItem('token');
    };
  }


  AuthInterceptor.$inject = ['$q', '$location', 'AuthToken'];
  /**
   * Intercepts the requests and adds token as a header
   */
  function AuthInterceptor($q, $location, AuthToken) {

    return {
      request: request,
      responseError: responseError
    };

    /**
     * Happens on every request
     */
    function request(config) {
      // grab the token
      var token = AuthToken.getToken();
      // if the token exists, add it to the header as x-access-token
      if (token)
        config.headers['x-access-token'] = token;
      return config;
    }

    /**
     * On response errors
     */
    function responseError(response) {
      // if our server returns a 403 forbidden response
      if (response.status == 403) {
        AuthToken.setToken();
        $location.path('/#/cart');
      }
      // return the errors from the server as a promise
      return $q.reject(response);
    };

  };

})()
