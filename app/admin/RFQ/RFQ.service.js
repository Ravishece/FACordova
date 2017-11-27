(function() {
  "use strict";

  angular
    .module("farmersApp")
    .service("RFQService", RFQService);

  RFQService.$inject = ["$timeout", "$http", "$q"];

  function RFQService($timeout, $http, $q) {

    var vm = this;
    vm.createRFQ = createRFQ;
    vm.getRFQs = getRFQs;
    vm.editRFQ = editRFQ;
    vm.updateRFQStatus = updateRFQStatus;
    vm.getQuotesForRFQ = getQuotesForRFQ;
    vm.updateQuoteStatus = updateQuoteStatus;
    
    function createRFQ(payload) {
      var deferred = $q.defer();

      var serviceURL = "/farmerconnect/services/rfqs/add";

      var headers = {
		 "Content-Type": "application/json"
      }
	    
      $http.post(serviceURL, payload, {
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
    
    function getRFQs() {
        var deferred = $q.defer();

        var serviceURL = "/farmerconnect/services/rfqs";

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
    
    function editRFQ(payload) {
        var deferred = $q.defer();

        var serviceURL = "/farmerconnect/services/rfqs/update";

        var headers = {
  		 "Content-Type": "application/json"
        }
  	    
        $http.put(serviceURL, payload, {
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
    
	function updateRFQStatus(RFQId, RFQstatus) {
        var deferred = $q.defer();

        var serviceURL = "/farmerconnect/services/rfqs/updatestatus";

        var headers = {
  		 "Content-Type": "application/json"
        }
  	    
        var payload = {
    			"rfqId": RFQId,
    			"status": RFQstatus
    		}
        
        $http.put(serviceURL, payload, {
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
    
	function getQuotesForRFQ(rfqId) {
        var deferred = $q.defer();

        var serviceURL = "/farmerconnect/services/rfqs/" + rfqId + "/quotes";

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
	
	function updateQuoteStatus(payload) {
        var deferred = $q.defer();

        var serviceURL = "/farmerconnect/services/rfqs/quotes/updatestatus";

        var headers = {
  		 "Content-Type": "application/json"
        }
  	    
        $http.put(serviceURL, payload, {
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


