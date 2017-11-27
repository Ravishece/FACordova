(function() {
	"use strict";

	angular.module("farmersApp").service("loginService", loginService);

	loginService.$inject = [ "$timeout", "$location", "$http", "$q",
			"$rootScope" ];

	function loginService($timeout, $location, $http, $q, $rootScope) {

		var vm = this;
		vm.login = login;
		vm.logout = logout;
		vm.registerSupplier = registerSupplier;
		vm.getAddress = getAddress;

		function login(userId, password, userRole, userIdTypeMobile) {
			var deferred = $q.defer();
			var serviceURL = "http://10.117.147.32:8080/farmerconnect/services/suppliers/login";

			if (userRole === 'ADMIN') {
				serviceURL = "http://10.117.147.32:8080/farmerconnect/services/users/login";
			}

			var payload = {
				"password" : password
			}
			
			if(userIdTypeMobile){
				payload.phoneNumber = userId
			}else{
				payload.emailId = userId
			}

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
		
		function registerSupplier(payload) {
			var deferred = $q.defer();
			var serviceURL = "http://10.117.147.32:8080/farmerconnect/services/suppliers/register";

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

		function logout() {
			var deferred = $q.defer();
			var serviceURL = "http://10.117.147.32:8080/farmerconnect/services/suppliers/logout";

			if (window.sessionStorage.userDetails === '') {
				$location.path('/');
				deferred.resolve({});
				return deferred.promise;
			}
			
			var userDetails = JSON.parse(window.sessionStorage.userDetails);

			var userRole = '';
			
			if(userDetails && userDetails.users && userDetails.users[0].userRole){
				userRole = userDetails.users[0].userRole;
			}
			
			if (userRole === 'ADMIN') {
				serviceURL = "http://10.117.147.32:8080/farmerconnect/services/users/logout";
			}

			// if($rootScope.userDetails.users &&
			// $rootScope.userDetails.users[0].userRole === 'ADMIN'){
			// serviceURL = "/farmerconnect/services/users/logout";
			// }

			var headers = {
				"Content-Type" : "application/json"
			}

			$http.get(serviceURL, {
				'headers' : headers
			}).success(function(results) {
				deferred.resolve(results || {});
				window.sessionStorage.userDetails = '';
			}).error(function(error) {
				deferred.reject({
					data : error
				});
			});
			return deferred.promise;
		}

		function getAddress() {
			var deferred = $q.defer();
			var serviceURL = "http://postalpincode.in/api/pincode/560103";
			
			var headers = {
				"Content-Type" : "application/json"
			}

			$http.get(serviceURL, {
				'headers' : headers
			}).success(function(results) {
				deferred.resolve(results || {});
				window.sessionStorage.userDetails = '';
			}).error(function(error) {
				deferred.reject({
					data : error
				});
			});
			return deferred.promise;
		}
		

	}
	;

})();
