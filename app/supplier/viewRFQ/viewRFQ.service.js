(function() {
  "use strict";

  angular
    .module("farmersApp")
    .service("viewRFQService", viewRFQService);

  viewRFQService.$inject = ["$timeout", "$http", "$q"];

  function viewRFQService($timeout, $http, $q) {

    var vm = this;
    vm.createQuote = createQuote;
    vm.deleteQuote = deleteQuote;
    vm.editQuote = editQuote;
    
    function createQuote(payload, rfqId) {
      var deferred = $q.defer();

      var serviceURL = "/farmerconnect/services/rfqs/"+ rfqId +"/quotes/add";

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
    
    function deleteQuote(rfqId) {
        var deferred = $q.defer();

        var serviceURL = "/farmerconnect/services/rfqs/quotes/" + rfqId + "/deletes";

        var headers = {
  		 "Content-Type": "application/json"
        }
  	    
        $http.delete(serviceURL, {
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
    
    function editQuote(payload) {
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


