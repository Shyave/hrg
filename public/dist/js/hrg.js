var ngApp = angular.module('hrgDashB', ['ngMaterial', 'nvd3'])

.config(function($interpolateProvider, $locationProvider, $controllerProvider){

	$interpolateProvider.startSymbol('[[');
	$interpolateProvider.endSymbol(']]');

	'use strict';
})
;
ngApp.controller('dataCtrl', ['$scope', '$rootScope', '$mdSidenav', '$mdToast', '$mdDialog', '$window', '$location', 'dataService', '$interval', function ($scope, $rootScope, $mdSidenav, $mdToast, $mdDialog, $window, $location, dataService, $interval) {

    $scope.skippedUrls = [];
    var skippedUrls = $scope.skippedUrls;

    $rootScope.loaderExceptionCount = 0;
    $scope.isAnythingLoading = function () {
        var reqCount = $http.pendingRequests
            .filter(function (req) {
                return !skippedUrls.includes(req.url);
            })
            .length;
        return reqCount > $rootScope.loaderExceptionCount;
    };

    /**
     * [Code related to Toast implementation starts here]
     */
    var last = {
        bottom: true,
        top: false,
        left: true,
        right: false
    };

    $scope.toastPosition = angular.extend({}, last);

    var pinTo = $scope.getToastPosition;
    $scope.getToastPosition = function () {
        sanitizePosition();
        return Object.keys($scope.toastPosition)
            .filter(function (pos) {
                return $scope.toastPosition[pos];
            })
            .join(' ');
    }

    function sanitizePosition() {
        var current = $scope.toastPosition;

        if (current.bottom && last.top) current.top = false;
        if (current.top && last.bottom) current.bottom = false;
        if (current.right && last.left) current.left = false;
        if (current.left && last.right) current.right = false;

        last = angular.extend({}, current);
    }

    $rootScope.showSimpleToast = function (text) {
        var pinTo = $scope.getToastPosition();
        $mdToast.show(
            $mdToast.simple()
                .textContent(text)
                .position(pinTo)
                .hideDelay(3000)
        );
    };

    $rootScope.failure = function () {
        $scope.showSimpleToast("Network error, please try again later");
    }

    /**
    * [Code related to Toast implementation Ends here]
    */

    $rootScope.showAlert = function (ev, id, title, content, bttn) {
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector(id)))
                .clickOutsideToClose(false)
                .title(title)
                .textContent(content)
                .ariaLabel('Alert Dialog Demo')
                .ok(bttn)
                .targetEvent(ev)
        );
    }

    $scope.options = {
        chart: {
            type: 'discreteBarChart',
            height: 450,
            width: 1000,
            margin: {
                top: 40,
                right: 80,
                bottom: 40,
                left: 80
            },
            x: function (d) { return d.label; },
            y: function (d) { return d.value + (1e-10); },
            showValues: true,
            valueFormat: function (d) {
                return d3.format(',.2f')(d);
            },
            duration: 500,
            xAxis: {
                axisLabel: 'X Axis (coins)'
            },
            yAxis: {
                axisLabel: 'Y Axis in $',
                axisLabelDistance: 10
            }
        }
    };

    $interval(_renderGraph, 300000);

    function _renderGraph() {
        var valArr = [];

        dataService.getData().then(function (data) {

            angular.forEach(data.data, function (v, k) {
                var _obj = {};
                _obj.label = v.name;
                _obj.value = (v.price_usd * 1);
                valArr.push(_obj);
            })

            $scope.data = [{
                key: "Cumulative Return",
                values: valArr
            }];

        })
    }

    var init = function() {
        
        _renderGraph();
        
    }();
}]);;
ngApp.service('dataService', ['$http', '$rootScope', function($http, $rootScope){
    this.getData = function(){
        var _url = 'https://api.coinmarketcap.com/v1/ticker/?limit=10';
        return $http.get(_url).then(function(res){
            return res;
        }, function(err){
            $rootScope.failure();
        })
    }
}]);