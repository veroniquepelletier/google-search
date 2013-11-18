"use strict"
var pane = angular.module('app.panes.about', []);

pane.controller('aboutCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.onClickButton = function () {
        $location.path('/home');
    };
}]);