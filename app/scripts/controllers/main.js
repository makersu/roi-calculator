'use strict';

/**
 * @ngdoc function
 * @name roiCalculatorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the roiCalculatorApp
 */
angular.module('roiCalculatorApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.input = [];
    $scope.results = {
    	hours:[],
    	hoursWPO2:[],
    	cost:[],
    	costWPO2:[],
    	timesaved:[],
    	costsaved:[],
    	totaltime:0,
    	totaltimesaved:0,
    	totalcost:0,
    	totalcostsaved:0
    }

    var fomula = [0.7,0.8,0.5,0.3,0.5]

    $scope.cal = function(){
    	console.log('cal');
    	//console.log($scope)
    	console.log($scope.input);

    	for(var i=0;i<$scope.input.length;i++){
    		$scope.results.hours[i]= parseInt($scope.input[i]);
    		$scope.results.hoursWPO2[i]=$scope.results.hours[i]*fomula[i];
    		$scope.results.cost[i]=$scope.results.hours[i]*200;
    		$scope.results.costWPO2[i]=$scope.results.hoursWPO2[i]*200;
    		$scope.results.timesaved[i]=$scope.results.hours[i]-$scope.results.hoursWPO2[i]
    		$scope.results.costsaved[i]=$scope.results.cost[i]-$scope.results.costWPO2[i]
    		$scope.results.totaltime += $scope.results.hours[i];
    		$scope.results.totaltimesaved += $scope.results.timesaved[i];
    		$scope.results.totalcost += $scope.results.cost[i];
    		$scope.results.totalcostsaved += $scope.results.costsaved[i];
    	}

    	console.log($scope.results);

    };

    $scope.clear = function(){
    	console.log('clear');
    	$scope.input = [];
    };

  });
