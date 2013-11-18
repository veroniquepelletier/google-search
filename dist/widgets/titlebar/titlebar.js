"use strict"
var widget = angular.module('app.widgets.titlebar', []);

widget.directive('titlebar', [function () {
    return {
        restrict: 'EA',
        scope: true,
        templateUrl: 'widgets/titlebar/titlebar.html',
        replace: false,
        link: function(scope, element) {
            console.log('new titlebar');
        }
    }
}]);
