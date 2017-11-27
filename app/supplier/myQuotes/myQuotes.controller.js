(function() {

	angular.module('farmersApp').controller('myQuotesCtrl', myQuotesCtrl);
	myQuotesCtrl.$inject = [ '$scope', '$location', '$q','myQuotesService','mainService', 'ngToast' ];

	function myQuotesCtrl($scope, $location, $q, myQuotesService, mainService,
			ngToast) {

		var vm = this;
		myQuotesService.getMyQuotes().then(
			function(response){
				if (response.errors && response.errors.length === 0) {
					vm.quotes = response.payload.quotes;
					vm.quotesPending = vm.quotes.filter(function(elem){
		    	  		    return elem.status !== 'ACCEPTED' && elem.status !== 'REJECTED';
		    	  		});
					vm.quotesAccepted = vm.quotes.filter(function(elem){
	  	    	  		    return elem.status === 'ACCEPTED';
	  	    	  		});
	  				vm.quotesRejected = vm.quotes.filter(function(elem){
	  	    	  		    return elem.status === 'REJECTED';
	  	    	  		});
	  				vm.quotesPendingCount = vm.quotesPending.length;
	  				vm.quotesAcceptedCount = vm.quotesAccepted.length;
	  				vm.quotesRejectedCount = vm.quotesRejected.length;
				} else {
					mainService.navToLoginPage(response);
				}
				
			}
		)

	};

})();