"use strict"
var pane = angular.module('app.panes.about', []);

module.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/about', {
        templateUrl: '/panes/about/about.html',
        scope: true,
        controller: ['$scope', '$location', function ($scope, $location) {
            $scope.onClickButton = function () {
                $location.path('/home');
            };
        }]
    });
}]);