(function(){
'use strict';
	/**
	 * Admin module: controller
	 */
	angular.module('ecommerceApp.admin')
	.controller('AdminController',AdminController);

		AdminController.$inject  = ['$scope', '$timeout',
    'iconService', 'productService'];

		function AdminController($scope, $timeout, iconService, productService){
			// --- view-model ---
			var vm = this;

			// --- controller public functions ---
			vm.editProduct 		= editProduct;
			vm.saveProduct 		= saveProduct;
			vm.removeProduct 	= removeProduct;
			vm.cancelForm     = cancelForm;

			activate();

			//////////////////////////////////////////

			/**
			 * Edit a product
			 *
			 * @param {object} product to edit
			 */
			function editProduct(product){
				vm.formProduct = product;
				vm.newProduct = false;
			}

			/**
			 * Save product
			 */
			function saveProduct(){
				var index = vm.products.findIndex(function(product){
					return product.id === vm.formProduct.id;
				});

        // --- update the view and ---
        // --- request the update to the service ---
        // --- with the proper method ---
				if (index === -1){

          var newProduct = vm.formProduct;
          newProduct.id = vm.products[vm.products.length - 1].id + 1;

          vm.products.push(newProduct);

					productService.add(vm.formProduct)
            .then(function(message){
              vm.successMessage = message;
              getAllProducts();
            },function (message) {
              getAllProducts();
              vm.errorMessage = message;
            });
        }
        else {
					productService.update(vm.formProduct)
            .then(function(message){
              vm.successMessage = message;
              getAllProducts();
            },function (message) {
              getAllProducts();
              vm.errorMessage = message;
            });
        }

				vm.formProduct = {
					icon: vm.iconsList[0].name
				};
				vm.newProduct = true;
        // --- set the form state back to pristine/untouched
        // --- after cancel/submit
        $scope.form.$setPristine();
        $scope.form.$setUntouched();
        removeMessages();
			}

			/**
			 * Remove product
			 */
			function removeProduct(product){
        // --- update the view ---
        var index = vm.products.indexOf(product);
        vm.products.splice(index);

        // --- request the update to the service ---
        // --- update products list either on succes or error ---
				productService.remove(product.id)
          .then(function(message){
            vm.successMessage = message;
            getAllProducts();
          },function(message){
            vm.errorMessage = message;
            getAllProducts();
          });
        removeMessages();
			}

      /**
       * Clears the form
       */
      function cancelForm() {
				vm.formProduct = {
					icon: vm.iconsList[0].name
				};
				vm.newProduct = true;
        // --- set the form state back to pristine/untouched
        // --- after cancel/submit
        $scope.form.$setPristine();
        $scope.form.$setUntouched();
      }
			/**
			 * Initializes the controller state
			 */
			function activate(){
				vm.newProduct = true;

				vm.formProduct = {}
				vm.iconsList = []

				iconService.getIcons()
          .then(function(icons){
            vm.iconsList = icons;
            vm.formProduct.icon = vm.iconsList[0].name;
          });

        getAllProducts();
			}

      /**
       * Gets all the products from the service
       */
      function getAllProducts() {
        productService.getAll()
          .then(function(products){
            vm.products = products;
          }, function(message){
            vm.errorMessage = message;
          });
      }

      /**
       * Remove the success/error messages
       */
      function removeMessages(){
        $timeout(function () {
          vm.errorMessage = null;
          vm.successMessage = null;
        }, 5000);
      }
		}
})();
