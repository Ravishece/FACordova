(function() {
  "use strict";

  angular
    .module("farmersApp")
    .service("mainService", mainService);

  mainService.$inject = ["$timeout", "$http", "$q", "$location"];

  function mainService($timeout, $http, $q, $location) {

	  	var vm = this;
	  	vm.navToLoginPage = navToLoginPage;
	  	
	  	function navToLoginPage(response){
			if(response.errors && response.errors.length > 0 && response.errors[0].indexOf('Please Login') !== -1){
				$location.path('/');
			}
	  	}
    
    

  };

})();


