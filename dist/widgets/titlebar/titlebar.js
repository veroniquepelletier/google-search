"use strict"
var widget = angular.module('app.widgets.titlebar', []);

widget.directive('titlebar', [function () {
    return {
        restrict: 'EA',
        scope: true,
        templateUrl: 'widgets/titlebar/titlebar.html',
        replace: false,
        link: function(scope) {
            scope.navigation = [
                {name: "HOME", url: '/home'},
                {name: "ABOUT", url: '/about'}
            ];
            
            scope.selected = scope.navigation[0];
            
            scope.onChangeRoute = function (item) {
                scope.selected = item;
            }
        }
    }
}]);
