(function(){
  
    angular.module('farmersApp').controller('produceSearchCtrl',produceSearchCtrl);
    produceSearchCtrl.$inject = ['$scope','$location','$q','produceListService', 'mainService', 'ngToast'];
  
    function produceSearchCtrl($scope,$location,$q, produceListService, mainService, ngToast) {
  
      var vm = this;
      vm.productsArray = [];
      vm.activeIcon = 'list';
      
      vm.filterCountries = [];
      vm.filterStates = [];
      vm.filterCategories = [];
      vm.filterSubCategories = [];
      
      vm.showfilterSubCategories = false;
      vm.showfilterStates = false;
      
      vm.selectedFilterCriteria = {}
      
      vm.changeIcon = function(val){
    	  	vm.activeIcon = val;
      }
      
      vm.getAllSupplierProducts = function(){
    	  	var filterString = '?';
    	  	for(prop in vm.selectedFilterCriteria){
    	  		if(vm.selectedFilterCriteria[prop]){
    	  			filterString += prop + "=" +vm.selectedFilterCriteria[prop] + '&';
    	  		}
    	  	}
    	  	
    	  	filterString = filterString.slice(0, -1);
    	  	
    	  	return produceListService.getAllSupplierProducts(filterString).then(
  			function(response){
  				if (response.errors && response.errors.length === 0) {
  					vm.productsArray = response.payload.supplierProduces;
  				}else{
  	  				mainService.navToLoginPage(response);
  				}
  			},
  			function(error){
    	  				
  			}
    	  	)
      };
      
      vm.setFilterCountries = function(){
	    	  produceListService.getProductCountries().then(
			  function(response){
				  vm.filterCountries = response;
			  },
			  function(error){
				  
			  }
	    	  )
	  }
      
      vm.setFilterCategories = function(){
	    	  produceListService.getProductCategories().then(
    			  function(response){
    				  if (response.errors && response.errors.length === 0) {
    					  	vm.filterCategories = response.payload.productCategories;
    	  				}else{
    	  	  				mainService.navToLoginPage(response);
    	  				}
    			  },
    			  function(error){
    				  
    			  }
	    	  )
      }
      
      vm.onFilterCountrySelect = function(country){
    	  	if(vm.selectedFilterCriteria['country'] === country){
			  return;
    	  	}else{
    	  		vm.selectedFilterCriteria['state'] = '';
    	  		vm.showfilterStates = false;
    	  		vm.getAllSupplierProducts().then(
  				function(response){
					produceListService.getProductStates(country).then(
					  function(response){
						  vm.filterStates = response;
						  vm.showfilterStates = true;
						  vm.selectedFilterCriteria['country'] = country;
					  },
					  function(error){
						  
					  }
			    	  	)
  				}
    	  		)
    	  	}
    	  	
    	  	
      }
      
      vm.onFilterCategorySelect = function(category){
    	  
    	  	if(vm.selectedFilterCriteria['category'] === category.productCategoryId){
			  return;
    	  	}else{
    	  		vm.selectedFilterCriteria['category'] = category.productCategoryId;
    	  		vm.selectedFilterCriteria['subCategory'] = '';
    	  		vm.showfilterSubCategories = false;
    	  		vm.getAllSupplierProducts().then(
  				function(response){
  					
  					produceListService.getProductSubCategories(category.productCategoryId).then(
					  function(response){
						  if(vm.productsArray.length > 0){
							  vm.filterSubCategories = response.payload.productSubCategories;
							  vm.showfilterSubCategories = true;
						  }
					  },
					  function(error){
						  
					  }
			  	  	)
  					
  				}
  				
    	  		)
    	  	}
    	  	
  	  	
      }
      
      vm.onFilterSubCategorySelect = function(subCategory){
    	  	vm.selectedFilterCriteria['subCategory'] = subCategory.productSubCategoryId;
    	  	vm.getAllSupplierProducts();
      }
      
      vm.onFilterStateSelect = function(state){
  	  	vm.selectedFilterCriteria['state'] = state;
  	  	vm.getAllSupplierProducts();
      }
      
      vm.clearProduceFilterClick = function(){
  	  	vm.showfilterStates = false;
	  	vm.showfilterSubCategories = false;
	  	vm.selectedFilterCriteria = {};
	  	
    	  	vm.getAllSupplierProducts();
    	  	vm.setFilterCountries();
    	  	vm.setFilterCategories();

      }
      
      vm.init = function(){
    	  	vm.getAllSupplierProducts();
    	  	vm.setFilterCountries();
    	  	vm.setFilterCategories();
      }
      
      vm.sendInquiryButtonClick = function(){
    	  	ngToast.create('Inquiry submitted successfully !');
      }
      
      vm.init();
    };
    
  })();