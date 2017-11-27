(function() {
  "use strict";

  angular
    .module("farmersApp")
    .service("myQuotesService", myQuotesService);

  myQuotesService.$inject = ["$timeout", "$http", "$q"];

  function myQuotesService($timeout, $http, $q) {

	  	var vm = this;
	    vm.getMyQuotes = getMyQuotes;
	    
	    function getMyQuotes() {
	      var deferred = $q.defer();

	      var serviceURL = "/farmerconnect/services/rfqs/quotes";

	      var headers = {
			 "Content-Type": "application/json"
	      }
		    
	      $http.get(serviceURL, {
		        'headers': headers
	      })
	      .success(function(results) {
	        deferred.resolve(results || {});
	      })
	      .error(function(error) {
	        deferred.reject({
	          data: error
	        });          
	      });
	      return deferred.promise;
	    }
    
    

  };

})();


