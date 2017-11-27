(function() {
	"use strict";

	angular.module("farmersApp").service("myProduceService", myProduceService);

	myProduceService.$inject = [ "$timeout", "$http", "$q" ];

	function myProduceService($timeout, $http, $q) {

		var vm = this;
		vm.getMyProduces = getMyProduces;
		vm.fetchAddressFromPinCode = fetchAddressFromPinCode;
		vm.submitProduce = submitProduce;

		function getMyProduces() {
			var deferred = $q.defer();

			var serviceURL = "/farmerconnect/services/suppliers/produce";

			var headers = {
				"Content-Type" : "application/json"
			}

			$http.get(serviceURL, {
				'headers' : headers
			}).success(function(results) {
				deferred.resolve(results || {});
			}).error(function(error) {
				deferred.reject({
					data : error
				});
			});
			return deferred.promise;
		}

		function fetchAddressFromPinCode(pinCode) {
			var deferred = $q.defer();

			var serviceURL = "http://postalpincode.in/api/pincode/" + pinCode;

			var headers = {
				"Content-Type" : "application/json"
			}

			$http.get(serviceURL, {
				'headers' : headers
			}).success(function(results) {
				deferred.resolve(results || {});
			}).error(function(error) {
				deferred.reject({
					data : error
				});
			});
			return deferred.promise;
		}
		
		function submitProduce(payload){
			var deferred = $q.defer();

			var serviceURL = "/farmerconnect/services/suppliers/produce/add";

			var headers = {
				"Content-Type" : "application/json"
			}

			$http.post(serviceURL, payload, {
				'headers' : headers
			}).success(function(results) {
				deferred.resolve(results || {});
			}).error(function(error) {
				deferred.reject({
					data : error
				});
			});
			return deferred.promise;
		}

	}

})();
