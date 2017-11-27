(function() {

	angular.module('farmersApp').controller('viewRFQCtrl', viewRFQCtrl);
	viewRFQCtrl.$inject = [ '$scope', '$location', '$q', 'RFQService', 'viewRFQService', 
		'mainService', 'ngToast' ];

	function viewRFQCtrl($scope, $location, $q, RFQService, viewRFQService, mainService,
			ngToast) {

		var vm = this;
		vm.RFQs = [];
		vm.RFQsOpened = [];
		vm.quoteHarvestDate = '';
		vm.selectedRFQId = '';
		vm.selectedRFQProduct = '';
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

		vm.loadRFQs = function() {
			RFQService.getRFQs().then(function(response) {
				if (response.errors && response.errors.length === 0) {
					vm.RFQs = response.payload.rfqSRO;
					vm.RFQsOpened = vm.RFQs.filter(function(elem) {
						return elem.status !== 'CLOSE';
					});

				} else {
					mainService.navToLoginPage(response);
					ngToast.warning('Error Occurred !');
				}
			}, function(error) {
				ngToast.warning('Error Occurred !');
			})
		}

		vm.submitQuote = function() {
			var payload = {
				"quantity" : vm.quoteQuantity,
				"unitPrice" : vm.quoteUnitPrice,
				"harvestDate" : vm.quoteHarvestDate
			};
			var rfqId = vm.selectedRFQId;
			viewRFQService.createQuote(payload, rfqId).then(function(response) {
				if (response.errors && response.errors.length === 0) {
					ngToast.create('Quote created successfully !');
				} else {
					mainService.navToLoginPage(response);
					ngToast.warning('Error Occurred !');
				}
			}, function(error) {
				ngToast.warning('Error Occurred !');
			});
		}

		vm.createQuoteButtonClick = function(RFQ) {
			vm.selectedRFQId = RFQ.rfqId;
			vm.selectedRFQProduct = RFQ.product.productName;
		}

		vm.init = function() {
			vm.loadRFQs();
		}

		vm.init();

	}
	;

})();