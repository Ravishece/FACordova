(function(){
  
	angular.module("farmersApp").controller('mainController', function($scope, $rootScope, $route, $location, loginService) {
		var vm = this;
		vm.routeClassName = '';
		
		$scope.$on('$routeChangeSuccess', function(newVal, oldVal) {
			if (oldVal !== newVal) {
		        vm.routeClassName = $route.current.className;
		    }
		});
		
		vm.submitLogout = function(){
	    	  	loginService.logout().then(
	  	  		function(response){
	  	  			if(response.errors && response.errors.length === 0){
	  	  				$location.path('/');
	  	  				$rootScope.userDetails = {};
	  	  			}
	  	  		}
	  		)
	    }
		
		vm.closeNavMenu = function(){
			$('.navbar-toggle-btn').click();
		}
	});
	
  })();