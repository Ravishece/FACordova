(function() {

	angular.module('farmersApp').controller('loginCtrl', loginCtrl);
	loginCtrl.$inject = [ '$scope', '$rootScope', '$location', '$q',
			'loginService', 'ngToast' ];

	function loginCtrl($scope, $rootScope, $location, $q, loginService, ngToast) {

		var vm = this;
		vm.loginServerError = false;
		vm.userRole = "ADMIN";
		vm.showLoginForm = true;
		
		loginService
		.getAddress().then(
			function(response){

			},
			function(error){

			}
		);

		vm.submitLogin = function() {
			vm.loginServerError = false;
			var userIdTypeMobile = /^\d{10}$/.test(vm.userId);
			
			loginService
					.login(vm.userId, vm.password, vm.userRole, userIdTypeMobile)
					.then(
							function(response) {
								if (response.errors
										&& response.errors.length === 0) {
									window.sessionStorage.userDetails = JSON
									.stringify(response.payload);
									if (response.payload.users
											&& response.payload.users[0].userRole === 'ADMIN') {
										$location.path('/admin');
										$rootScope.userDetails = response.payload;
									} else {
										$location.path('/supplier');
									}
								} else {
									vm.loginServerError = true;
								}
							}, function(errorResponse) {

							})
		}
		
		vm.submitRegistration = function(){
			
			var payload = {
				"emailId": vm.registerEmailId,
				"password": vm.registerPassword,
				"firstName": vm.registerFirstName,
				"middleName": vm.registerMiddleName,
				"lastName": vm.registerLastName,
				"phoneNumber": vm.registerMobileNo
			}
			
			loginService.registerSupplier(payload).then(
				function(response){
					if (response.errors && response.errors.length === 0) {
						vm.showLoginForm = true;
						vm.userId = vm.registerEmailId;
						ngToast.create('User Registered successfully ! please login now');
					}
				},
				function(error){
					ngToast.warning('Error Occurred !');
				}
			)
		}

	}
	;

})();