"use strict"
var pane = angular.module('app.panes.home', []);

module.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: '/panes/home/home.html',
        scope: true
    });
}]);