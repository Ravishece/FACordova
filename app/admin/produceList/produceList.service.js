(function() {
  "use strict";

  angular
    .module("farmersApp")
    .service("produceListService", produceListService);

  produceListService.$inject = ["$timeout", "$http", "$q"];

  function produceListService($timeout, $http, $q) {

    var vm = this;
    vm.getAllSupplierProducts = getAllSupplierProducts;
    vm.getProductCategories = getProductCategories;
    vm.getProductSubCategories = getProductSubCategories;
    vm.getProductCountries = getProductCountries;
    vm.getProductStates = getProductStates;
    vm.getAllProducts = getAllProducts;
    
    function getAllProducts() {
      var deferred = $q.defer();

      var serviceURL = "/farmerconnect/services/products";

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
    
    function getAllSupplierProducts(filterString) {
      var deferred = $q.defer();

      var serviceURL = "/farmerconnect/services/suppliers/produce" + filterString;

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
    
    function getProductCategories() {
        var deferred = $q.defer();

        var serviceURL = "/farmerconnect/services/products/categories";

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
    
    function getProductSubCategories(category) {
        var deferred = $q.defer();

        var serviceURL = "/farmerconnect/services/products/categories/"+ category +"/subcategories";

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
    
    function getProductCountries() {
        var deferred = $q.defer();

        var serviceURL = "/farmerconnect/services/locations/produce/countries";

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
    
    function getProductStates(country){
    		var deferred = $q.defer();

        var serviceURL = "/farmerconnect/services/locations/produce/"+ country +"/states";

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


