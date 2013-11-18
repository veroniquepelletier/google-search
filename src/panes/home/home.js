"use strict"
var pane = angular.module('app.panes.home', []);

pane.controller('homeCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.onClickButton = function () {
        $location.path('/about');
    };
}]);