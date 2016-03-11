(function() {
'use strict';
	/**
	 * Cart module: controller
	 */
	angular
	.module('ecommerceApp.cart')
	.controller('CartController', CartController)
	.controller('CartModalController', CartModalController);

	CartController.$inject = ['productService', 'cartService', '$uibModal', 'Auth'];

	function CartController(productService, cartService, $uibModal, Auth) {
    // --- view-model ---
    var vm = this;

		vm.cartService = cartService;

		// --- controller public functions ---
		vm.addToCart 	= addToCart;
    vm.openModal  = openModal;
    vm.login      = login;

		activate();

		////////////////

    /**
     * Login as admin
     */
    function login(){
      Auth.login();
    }

		/**
		 * Adds a product to the cart
		 */
		function addToCart(product){
			// --- update cart ---
			vm.cart = cartService.addToCart({
				id: product.id,
				name: product.name,
				price: product.price,
				icon: product.icon
			}, vm.amounts[product.id]);

			// --- update products ---
			var index = vm.products.findIndex(function(item){
				return item.id === product.id
			});
			vm.products[index].stock -= vm.amounts[product.id];
			vm.amounts[product.id] = null;

			vm.checkedout = false;
		}

		/**
		 * Checks out the cart
		 */
		function checkout(){
      // --- update all the products ---
      angular.forEach(vm.cart, function(val, i){
        var index = vm.products.findIndex(function(product){
          return product.id === val.id
        });
        productService.update( vm.products[index] );
      });
      // --- checkout the cart ---
		}

		/**
		 * Clears the cart
		 */
		function emptyCart(){
      // --- get all the products ---
			productService.getAll()
        .then(function(products){
          vm.products = products;
        }, function(message){
          vm.errorMessage = message;
        });
		}

		/**
		 * Initializes controller state
		 */
		function activate() {
			vm.showCart 	= false;
			vm.checkedout = false;
			vm.cart 			= cartService.getCart();

      // --- get the products ---
			productService.getAll()
        .then(function(products){
          vm.products = products;
          updateByCart();
        }, function(message){
          vm.errorMessage = message;
        });
		}

    /**
     * Updates producs list accordiong to the items in the cart
     */
    function updateByCart(){
      if (vm.cart.length){
        angular.forEach(vm.cart, function(val){
          var index = vm.products.findIndex(function(product){
            return product.id === val.id
          })
          if (index > -1){
            vm.products[index].stock -= val.amount
          }
        });
      }
    }

    /**
     * Opens the modal
     */
    function openModal() {

      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        templateUrl: 'cart-modal.html',
        controller: 'CartModalController as modal',
        keyboard: false,
        backdrop: 'static',
        resolve: {
          cartItems: function () {
            return vm.cart;
          }
        }
      });

      modalInstance
        .result
        .then(function (checkedout) {
          // --- resolve ---
          // --- either checked out or emptied the cart ---
          if(checkedout){
            checkout();
          }
          else {
            emptyCart();
          }
        });
    }

	}

  CartModalController.$inject = ['$uibModalInstance', 'cartItems', 'cartService'];

  function CartModalController($uibModalInstance, cartItems, cartService) {
    // --- view model ---
    var vm = this;
    vm.cartItems    = cartItems;
    vm.cartService  = cartService;

    vm.ok           = ok;
    vm.checkout     = checkout;
    vm.emptyCart    = emptyCart;


    /**
     * Checks out the cart items
     */
    function checkout(){
      vm.cartItems = cartService.checkout();
      vm.checkedout = true;
    }

    /**
     * Checks out the cart items
     */
    function emptyCart(){
      vm.cartItems = cartService.empty();
      vm.checkedout = false;
    }

    /**
     * Closes the modal with a resolve
     */
    function ok() {
      $uibModalInstance.close(vm.checkedout);
    };
  };
})();
