(function() {
  angular.module("farmersApp", ["ngRoute", "ui.bootstrap", "ngSanitize" , "ngToast"]);
  
  //Enabling HTML5 mode for URL Rewriting using HTML5 History API only in HTML5 supported browsers >IE9.
  //For IE9, url rewriting is handled using hashbang method.
  angular.module("farmersApp").config(['$locationProvider','$routeProvider', "ngToastProvider", function($locationProvider, $routeProvider, ngToast){
	// if(history.pushState){
	// 	$locationProvider.html5Mode({requireBase: false, enabled: true,rewriteLinks :false});
	// }

	$routeProvider
	   .when('/', {
        templateUrl: '/farmerconnect/app/login/login.html',
        resolve: {
          load:['$location',function($location){
//            if(!window.prescriptionSubmitted)
//              $location.path('/');
          }]
        },
        className: 'login-page'
       })
       .when('/admin',{
         templateUrl: '/farmerconnect/app/admin/RFQ/RFQ.html',
         className: 'admin-rfq-page'
       })
       .when('/produceList',{
         templateUrl: '/farmerconnect/app/admin/produceList/produceList.html',
         className: 'admin-produce-list-page'
       })
       .when('/supplier',{
         templateUrl: '/farmerconnect/app/supplier/viewRFQ/viewRFQ.html',
         className: 'supplier-view-rfq-page'
       })
       
       .when('/supplierQuotes',{
         templateUrl: '/farmerconnect/app/supplier/myQuotes/myQuotes.html',
         className: 'supplier-my-quotes'
       })
       .when('/supplierProduce',{
         templateUrl: '/farmerconnect/app/supplier/myProduce/myProduce.html',
         className: 'supplier-my-produce'
       })
       
       
      .otherwise({
        redirectTo:'/'
      })

      // use the HTML5 History API
      //$locationProvider.html5Mode(true);
      
      ngToast.configure({
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          maxNumber: 3,
          timeout: 2000,
          animation: 'fade',
          additionalClasses: 'my-toast'
        });
      
  }]);
  
  
})();