(function() {

	angular.module('farmersApp').controller('myProduceCtrl', myProduceCtrl);
	myProduceCtrl.$inject = [ '$scope', '$location', '$q', 'myProduceService',
			'produceListService', 'mainService', 'registerService','ngToast' ];

	function myProduceCtrl($scope, $location, $q, myProduceService,
			produceListService, mainService, registerService, ngToast) {

		var vm = this;
		vm.productsList = [];
		vm.selectedProduct = '--select--';
		vm.selectedProductId = 0;
		vm.selectedProductUnit = 'Unit';
		vm.showLocationDetailsForAddProduce = false;
		vm.addProduceDefaultAddressValue = true;

		vm.produceHarvestDate = '';
		vm.popup1 = {
			opened : false
		};
		vm.open1 = function() {
			vm.popup1.opened = true;
		};
		vm.dateOptions = {
			dateDisabled : _dateDisabled,
			formatYear : 'yy',
			maxDate : new Date(2020, 5, 22),
			minDate : new Date(),
			startingDay : 1
		};

		// Disable weekend selection
		function _dateDisabled(data) {
			var date = data.date, mode = data.mode;
			return mode === 'day'
					&& (date.getDay() === 0 || date.getDay() === 6);
		}

		vm.initProducts = function() {
			produceListService.getAllProducts().then(function(response) {
				if (response.errors && response.errors.length === 0) {
					vm.productsList = response.payload.products;
				} else {
					mainService.navToLoginPage(response);
					ngToast.warning('Error loading RFQs !');
				}
			}, function(errorResponse) {
				ngToast.warning('Error loading RFQs !');
			})
		}

		vm.openProduceModal = function() {
			vm.initProducts();
			vm.selectedProduct = "--select--";
			vm.selectedProductId = "";
			vm.selectedProductUnit = "unit";
		}

		vm.changeProduct = function(ProductDetails) {
			vm.selectedProduct = ProductDetails.productName;
			vm.selectedProductId = ProductDetails.productId;
			vm.selectedProductUnit = ProductDetails.productUnit;
		}

		vm.addProduceButtonClick = function() {
			vm.openProduceModal();
			registerService.getSupplierAddress().then(
				function(response){
					if (response.errors && response.errors.length === 0) {
						vm.supplierDefaultAddress = response.payload.addresses;
					} else {
						mainService.navToLoginPage(response);
						ngToast.warning('Error loading RFQs !');
					}
				}
			)
		}
		
		vm.capitalizeFirstLetter = function(string) {
		    return string.charAt(0).toUpperCase() + string.slice(1);
		}

		vm.addProduceSubmit = function() {
			
			var Country = vm.addProduceDefaultAddressValue ? vm.supplierDefaultAddress[0].country : vm.capitalizeFirstLetter(vm.produceCountry);
			var State = vm.addProduceDefaultAddressValue ? vm.supplierDefaultAddress[0].state : vm.capitalizeFirstLetter(vm.produceState);
			var District = vm.addProduceDefaultAddressValue ? vm.supplierDefaultAddress[0].district : vm.capitalizeFirstLetter(vm.produceDistrict);
			var pinCode = vm.addProduceDefaultAddressValue ? vm.supplierDefaultAddress[0].pinCode : vm.producePinCode;
			
			var payload = {
				"description" : vm.produceDescription,
				"quantity" : vm.produceQuantity,
				"harvestDate" : vm.produceHarvestDate,
				"productId" : vm.selectedProductId,
				"district" : District,
				"state" : State,
				"country" : Country,
				"longitude" : "",
				"latitude" : "",
				"pinCode" : pinCode,
				"expectedPrice" : vm.produceUnitPrice,
				"useDefaultAddress" : vm.addProduceDefaultAddressValue
			}
			myProduceService.submitProduce(payload).then(function(response) {
				if (response.errors && response.errors.length === 0) {
					ngToast.create('Produce Submitted successfully !');
					vm.updateMyProduces();
				} else {
					mainService.navToLoginPage(response);
					ngToast.warning('Error Occurred !');
				}
			})
		}

		vm.populateAddress = function(pincode) {
			vm.fetchedAddress = {};
//			myProduceService.fetchAddressFromPinCode(pincode).then(
//				function(response) {
//					vm.fetchedAddress = response;
//				})
		}
		
		vm.updateMyProduces = function(){
			myProduceService.getMyProduces().then(function(response) {
				if (response.errors && response.errors.length === 0) {
					vm.myProduces = response.payload.supplierProduces;
  				}else{
  					mainService.navToLoginPage(response);
  				}
			})
		}
		
		vm.addProduceDefaultAddressChange = function(evt){
			if(!vm.addProduceDefaultAddressValue){
				vm.showLocationDetailsForAddProduce = true;
			}else{
				vm.showLocationDetailsForAddProduce = false;
			}
		}

		vm.init = function() {
			vm.updateMyProduces();
		}

		vm.init();

	}
	;

})();