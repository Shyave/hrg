var ngApp = angular.module('hrgDashB', ['ngMaterial', 'nvd3'])

.config(function($interpolateProvider, $locationProvider, $controllerProvider){

	$interpolateProvider.startSymbol('[[');
	$interpolateProvider.endSymbol(']]');

	'use strict';
})
