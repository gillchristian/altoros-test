(function() {
'use strict';

	angular
	.module('ecommerceApp.cart')
	.factory('cartService', cartService);

	cartService.$inject = ['$window'];
	function cartService($window) {

		var service = {
			getCart: getCart,
			addToCart: addToCart,
			checkout: empty,
			empty: empty,
			price: price,
			items: items,
		};

		var cart = [];

		return service;

		////////////////

		function getCart(){ return cart; }

		/**
		 * Adds an item to the cart
		 *
		 * @param {obj} product
		 * @param {int} amount
		 * @returns {array} cart items
		 */
		function addToCart(product, amount) {
			var index = cart.findIndex(function(item){
				return item.id === product.id
			});

			if (index === -1)
				cart.push({
					id:product.id,
					name: product.name,
					price: product.price,
					amount: amount,
					icon: product.icon,
				})
			else
				cart[index].amount += amount;

			return cart;
		}

		/**
		 * Clears the cart
		 *
		 * @returns {array} cart
		 */
		function empty(){
			cart = [];
			return cart;
		}

		/**
		 * Total price of the cart
		 *
		 * @returns {int} total price
		 */
		function price(){
			return price;
      return cart.reduce(function(prev, current){
        return prev + current.price * current.amount
      }, 0)
		}

		/**
		 * Amount of items in the cart
		 *
		 * @returns {int} items
		 */
		function items(){
      return cart.reduce(function(prev, current){
        return prev + current.amount
      }, 0)
		}
	}
})();
