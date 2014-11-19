'use strict';

/**
 * @ngdoc function
 * @name roiCalculatorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the roiCalculatorApp
 */
angular.module('roiCalculatorApp')
  .controller('MainCtrl', function ($scope, $timeout) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.inputList = [
      { title: 'RTOS/Middleware Solution Development', tooltip: 'This question is asking the number of hours you will be spending on development of custom RTOS/Middleware' },
      { title: 'Porting RTOS/Middleware', tooltip: 'This question is asking the number of hours you will be spending on Porting of RTOS/Middleware Software to a new platform' },
      { title: 'Debugging RTOS/Middleware', tooltip: 'This question is asking the number of hours you will be spending on Debugging of RTOS/Middleware S/W on a new platform' },
      { title: 'Number of hours spent on training new Engineers on RTOS/Middleware', tooltip: 'Number of hours spent on training when you hire a new Engineers' },
      { title: 'Hours of Certification and Standards Compliance', tooltip: 'Many Application or Design require adherence to various certification and Standards compliance. This question is asking How much would you save with a qualified off the shell Solution Vs a Custom Solution? For Example: EN50128 / IEC 61508 SIL2<br>IEC 61508 SIL3<br>FDA 510(k) Medical Class I<br>FDA 510(k) Medical Class II<br>IEC 62304 SIL3<br>DO-178B Level A<br>DO-178B Level B<br>DO-178B Level C'}
    ];
    $scope.input = [];
    
    var body = angular.element('body')[0];
    var calCharts;

    var fomula = [0.7,0.8,0.5,0.3,0.5];

    var barTooltips = function(data) {
      return data.series + ': ' + data.value;
    };
    var clearResults = function() {
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
      };
    };
    var checkInputs = function() {
      var notEmpty = true;
      if ($scope.input.length == 0) return false;
      angular.forEach($scope.input, function(val) {
        notEmpty &= (val !== null && val !== '');
      });
      return notEmpty;
    };

    $scope.timeSavedPieConfig = {
      title: 'Total Time Saved',
      labels: false,
      tooltips: true,
      mouseover: function() {},
      mouseout: function() {},
      click: function() {},
      innerRadius: '45%', // applicable on pieCharts, can be a percentage like '50%'
      colors: [ '#254b8a', '#dbdbdb' ]
    };
    $scope.costSavedPieConfig = {
      title: 'Total Cost Saved',
      labels: false,
      tooltips: true,
      mouseover: function() {},
      mouseout: function() {},
      click: function() {},
      innerRadius: '45%', // applicable on pieCharts, can be a percentage like '50%'
      colors: [ '#254b8a', '#dbdbdb' ]
    };

    $scope.timeSavedBarConfig = {
      title: '',
      labels: false,
      mouseover: function() {},
      mouseout: function() {},
      click: function() {},
      "legend": {
        "display": true,
        "position": "bottom"
      },
      tooltips: barTooltips,
      innerRadius: 0, // applicable on pieCharts, can be a percentage like '50%'
      colors: [ '#254b8a', '#669934' ],
      yAxisTickFormat: 's'
    };
    $scope.costSavedBarConfig = {
      title: '',
      labels: false,
      mouseover: function() {},
      mouseout: function() {},
      click: function() {},
      "legend": {
        "display": true,
        "position": "bottom"
      },
      tooltips: barTooltips,
      innerRadius: 0, // applicable on pieCharts, can be a percentage like '50%'
      colors: [ '#254b8a', '#669934' ]
    };

    $scope.cal = function(){
      // Clear results
      clearResults();
      if (checkInputs()) {
        //console.log('cal');
        //console.log($scope.input);

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

        // Show results
        console.log($scope.results);
        calCharts.show();
        $scope.timeSavedPie = {
          series: [ 'Time Saved', 'Total Time' ],
          data: [
            {
              x: 'Time Saved',
              y: [ $scope.results.totaltimesaved ]
            },
            {
              x: 'Total Time',
              y: [ ($scope.results.totaltime - $scope.results.totaltimesaved) ]
            }
          ]
        };
        $scope.costSavedPie = {
          series: [ 'Cost Saved', 'Total Cost' ],
          data: [
            {
              x: 'Cost Saved',
              y: [ $scope.results.totalcostsaved ]
            },
            {
              x: 'Total Cost',
              y: [ ($scope.results.totalcost - $scope.results.totalcostsaved) ]
            }
          ]
        };

        $scope.timeSavedBar = {
          series: [ 'Time', 'w/PO2 Savings' ],
          data: [
            {
              x: 'Developing',
              y: [ $scope.results.hours[0], $scope.results.hoursWPO2[0] ]
            },
            {
              x: 'Debugging',
              y: [ $scope.results.hours[1], $scope.results.hoursWPO2[1] ]
            },
            {
              x: 'Porting',
              y: [ $scope.results.hours[2], $scope.results.hoursWPO2[2] ]
            },
            {
              x: 'Training',
              y: [ $scope.results.hours[3], $scope.results.hoursWPO2[3] ]
            },
            {
              x: 'Certification',
              y: [ $scope.results.hours[4], $scope.results.hoursWPO2[4] ]
            }
          ]
        };
        $scope.costSavedBar = {
          series: [ 'Cost', 'w/PO2 Savings' ],
          data: [
            {
              x: 'Developing',
              y: [ $scope.results.cost[0], $scope.results.costWPO2[0] ]
            },
            {
              x: 'Debugging',
              y: [ $scope.results.cost[1], $scope.results.costWPO2[1] ]
            },
            {
              x: 'Porting',
              y: [ $scope.results.cost[2], $scope.results.costWPO2[2] ]
            },
            {
              x: 'Training',
              y: [ $scope.results.cost[3], $scope.results.costWPO2[3] ]
            },
            {
              x: 'Certification',
              y: [ $scope.results.cost[4], $scope.results.costWPO2[4] ]
            }
          ]
        };
      } else {
        console.log('empty');
        $scope.clear();
      }

    };

    $scope.clear = function(){
    	console.log('clear');
    	$scope.input = [];
      calCharts.hide();
    };

    // Onload
    $timeout(function() {
      calCharts = angular.element(body.querySelector('.calCharts'));
      calCharts.hide();
    }, 100);

  });
