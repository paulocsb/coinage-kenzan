coinageApp.controller('coinageController', ['$scope', 'coinageService', function ($scope, coinageService) {

	$scope.calculateAmount = function() {
  	$scope.amounts = coinageService.calculateAmount($scope.amount);
	};

}]);