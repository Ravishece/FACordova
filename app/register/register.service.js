(function() {
  "use strict";

  angular
    .module("farmersApp")
    .service("registerService", registerService);

  registerService.$inject = ["$timeout", "$http", "$q"];

  function registerService($timeout, $http, $q) {

    var vm = this;
    vm.getSupplierAddress = getSupplierAddress;
    vm.addSupplierAddress = addSupplierAddress;
    
    function getSupplierAddress() {
      var deferred = $q.defer();

      var serviceURL = "/farmerconnect/services/suppliers/addresses";

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
    
    function addSupplierAddress(payload) {
        var deferred = $q.defer();

        var serviceURL = "/farmerconnect/services/suppliers/addresses/add";

        var headers = {
  		 "Content-Type": "application/json"
        }
  	    
        $http.get(serviceURL, payload, {
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


