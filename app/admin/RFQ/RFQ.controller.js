(function(){
  
    angular.module('farmersApp').controller('RFQCtrl',RFQCtrl);
    RFQCtrl.$inject = ['$scope','$location','$q','produceListService', 'RFQService', 'mainService', 'ngToast'];
  
    function RFQCtrl($scope, $location, $q, produceListService, RFQService, mainService,ngToast) {
  
      var vm = this;
      vm.RFQProductsList =  [];
      vm.RFQs = [];
      vm.RFQsOpened = [];
      vm.RFQsClosed = [];
      vm.selectedRFQProduct = '--select--';
      vm.selectedRFQProductId = 0;
      vm.selectedRFQProductUnit = 'Unit';
      vm.selectedRFQId = '';
      vm.editRFQSelected = false;
      vm.dateOptions = {
	    dateDisabled: _dateDisabled,
	    formatYear: 'yy',
	    maxDate: new Date(2020, 5, 22),
	    minDate: new Date(),
	    startingDay: 1
	  };
      vm.RFQStartDate = '';
      vm.RFQEndDate = '';
	  vm.popup1 = {
	    opened: false
	  };
      vm.popup2 = {
	    opened: false
	  };
      vm.open1 = function() {
    	    vm.popup1.opened = true;
    	  };
    	  vm.open2 = function() {
  	    vm.popup2.opened = true;
  	  };
  	  
    	  
      // Disable weekend selection
      function _dateDisabled(data) {
        var date = data.date,
          mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
      }
  
      vm.openRFQModal = function(){
  		vm.editRFQSelected = false;
		vm.initRFQProducts();
		vm.RFQDescriptionInput = "";
		vm.selectedRFQProduct = "--select--";
		vm.selectedRFQProductId = "";
		vm.selectedRFQProductUnit = "unit";
		vm.RFQQuantityInput = null;
		vm.RFQStartDate = null;
		vm.RFQEndDate = null;
      }
      
      vm.changeRFQProduct = function(ProductDetails){
    	  	vm.selectedRFQProduct = ProductDetails.productName;
    	  	vm.selectedRFQProductId = ProductDetails.productId;
    	  	vm.selectedRFQProductUnit = ProductDetails.productUnit;
      }
      /*
       
      	if (response.errors && response.errors.length === 0) {
		  	vm.filterCategories = response.payload.productCategories;
		}else{
				mainService.navToLoginPage(response);
		}
		
		*/
      
      vm.initRFQProducts = function(){
    	  	produceListService.getAllProducts().then(
  	  		function(response){
  	  			if(response.errors && response.errors.length === 0){
  	  				vm.RFQProductsList = response.payload.products;
  	  			}else{
  	  				mainService.navToLoginPage(response);
  	  				ngToast.warning('Error loading RFQs !');
  	  			}
  	  		},
  	  		function(errorResponse){
  	  			ngToast.warning('Error loading RFQs !');
  	  		}
  	  	)
      }
      
      vm.createRFQ = function(){
    	  	var RFQDetailsObj = {
  			"description":vm.RFQDescriptionInput,
  			"quantity": vm.RFQQuantityInput,
  			"openDate": vm.RFQStartDate,
  			"closeDate": vm.RFQEndDate,
  			"productId": vm.selectedRFQProductId
    	  	}
    	  	RFQService.createRFQ(RFQDetailsObj).then(
  			function(response){
  				if(response.errors && response.errors.length === 0){
	  				vm.loadRFQs();
	  				ngToast.create('RFQ created successfully !');
  				}else{
  					mainService.navToLoginPage(response);
  					ngToast.warning('Error Occurred !');
  				}
  			},
  			function(errorResponse){
  				ngToast.warning('Error Occurred !');
  			}
    	  	)
      }
      
      vm.editRFQButtonClick = function(RFQ){
    	  	vm.editRFQSelected = true;
    	  	vm.initRFQProducts();
		vm.selectedRFQId = RFQ.rfqId;
		vm.RFQDescriptionInput = RFQ.description;
		vm.selectedRFQProduct = RFQ.product.productName;
		vm.selectedRFQProductId = RFQ.product.productId;
		vm.selectedRFQProductUnit = RFQ.product.productUnit;
		vm.RFQQuantityInput = RFQ.quantity;
		vm.RFQStartDate = Date.now();
		vm.RFQEndDate = RFQ.closeDate;
      }
      
      vm.closeRFQButtonClick = function(RFQ){
    	  	RFQService.updateRFQStatus(RFQ.rfqId, "CLOSE").then(
  			function(response){
  				if(response.errors && response.errors.length === 0){
  					vm.loadRFQs();
  	  				ngToast.create('RFQ closed successfully !');
  				}else{
  					mainService.navToLoginPage(response);
  					ngToast.warning('Error Occurred !');
  				}
  			},
  			function(error){
  				ngToast.warning('Error Occurred !');
  			}
    	  	)
      }
      
      
      
      vm.updateRFQ = function(){
    	  	var RFQDetailsObj = {
    	  		"rfqId":vm.selectedRFQId,
  			"description":vm.RFQDescriptionInput,
  			"quantity": vm.RFQQuantityInput,
  			"openDate": vm.RFQStartDate,
  			"closeDate": vm.RFQEndDate,
  			"productId": vm.selectedRFQProductId
    	  	}
    	  	RFQService.editRFQ(RFQDetailsObj).then(
  			function(response){
  				if(response.errors && response.errors.length === 0){
  					vm.loadRFQs();
  	  				ngToast.create('RFQ updated successfully !');
  				}else{
  					mainService.navToLoginPage(response);
  					ngToast.warning('Error Occurred !');
  				}
  			},
  			function(error){
  				ngToast.warning('Error Occurred !');
  			}
    	  	)
      }
      
      vm.loadRFQs = function(){
    	  	RFQService.getRFQs().then(
  			function(response){
  				if(response.errors && response.errors.length === 0){
  					vm.RFQs = response.payload.rfqSRO;
  					vm.RFQsOpened = vm.RFQs.filter(function(elem){
	  	    	  		    return elem.status !== 'CLOSE';
	  	    	  		});
	  				vm.RFQsClosed = vm.RFQs.filter(function(elem){
	  	    	  		    return elem.status === 'CLOSE';
	  	    	  		});
		  				
  				}else{
  					mainService.navToLoginPage(response);
  					ngToast.warning('Error Occurred !');
  				}
  			},
  			function(error){
  				ngToast.warning('Error Occurred !');
  			}
    	  	)
      }
      
      vm.viewBidsButtonClick = function(rfqId){
    	  	vm.updateQuotesSection(rfqId);
      };
      
      vm.updateQuotesSection = function(rfqId){
    	  	RFQService.getQuotesForRFQ(rfqId).then(
  			function(response){
  				if (response.errors && response.errors.length === 0) {
  					vm["RFQ"+rfqId+"Quotes"] = response.payload.quotes;
  	  				if(response.payload.quotes.length > 0){
  	  					vm["RFQ"+rfqId+"QuotesAvailable"] = true;
  	  				}else{
  	  					vm["RFQ"+rfqId+"QuotesAvailable"] = false;
  	  				}
  				}else{
  					mainService.navToLoginPage(response);
  				}
  			}
    	  	)
      }
      
      vm.acceptQuotesButtonClick = function(rfqId){
    	  	var quotes = vm["RFQ"+rfqId+"Quotes"];
    	  	var updatedStatusForQuote = false;
    	  	for(quote in quotes){
    	  		var quoteId = quotes[quote].quoteId;
    	  		var status = quotes[quote].status1 === true ? "ACCEPTED" : quotes[quote].status;
    	  		if(quotes[quote].status1){
    	  			updatedStatusForQuote = true;
    	  			vm.updateQuoteStatus(quoteId, status);
    	  		}
    	  	}
    	  	if(updatedStatusForQuote){
    	  		window.setTimeout(function(){vm.updateQuotesSection(rfqId)}, 100);
    	  	}
      }
      
      vm.rejectBidsButtonClick = function(rfqId){
    	  	vm.quoteRejectionReason = '';
    	  	vm.RFQIdForRejection = rfqId;
      }
      
      vm.submitRejectedQuotes = function(rfqId){
  	  	//vm.quoteRejectionReason
    	  	rfqId = vm.RFQIdForRejection;
    	  	var quotes = vm["RFQ"+rfqId+"Quotes"];
  	  	var updatedStatusForQuote = false;
  	  	for(quote in quotes){
  	  		var quoteId = quotes[quote].quoteId;
  	  		var status = quotes[quote].status1 === true ? "REJECTED" : quotes[quote].status;
  	  		if(quotes[quote].status1){
  	  			updatedStatusForQuote = true;
  	  			vm.updateQuoteStatus(quoteId, status, vm.quoteRejectionReason);
  	  		}
  	  	}
  	  	if(updatedStatusForQuote){
  	  		window.setTimeout(function(){vm.updateQuotesSection(rfqId)}, 100);
  	  	}
      }
      
      vm.updateQuoteStatus = function(quoteId, status, remark){
    	  	//remark = remark ? remark: '';
    	  	var payload = {
  			"quoteId": quoteId,
  			"status": status,
  			"remark": (remark ? remark: '')
  		}
    	  	RFQService.updateQuoteStatus(payload).then(
  			function(response){
  				if (response.errors && response.errors.length === 0) {
  	  				ngToast.create('Quote updated successfully !');
  				}else{
  					mainService.navToLoginPage(response);
  				}
  				
  			},
  			function(error){
  				ngToast.warning('Error Occurred !');
  			}
    	  	)
      }
      
      vm.init = function(){
    	  	vm.loadRFQs();
      }

      vm.init();
    };
    
  })();