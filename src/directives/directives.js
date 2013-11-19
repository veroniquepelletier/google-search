var module = angular.module('app.directives', []);

module.directive('googlemap', ['googleMapSvc', function (googleMapSvc) {
    var id = 'map-canvas';
    return {
        restrict: 'E',
        template: "<div id='" + id + "' style='width: 100%; height: 100%'></div>",
        link: function () {
            googleMapSvc.createMap(id);
        }
    }
}]);

module.directive('search', ['googleMapSvc', function (googleMapSvc) {
    var id = 'search-input';
    return {
        restrict: 'E',
        template:  "<input id=" + id + " class='controls' type='text' placeholder='Search Box'>",
        link: function () {
            var input = document.getElementById(id);
            googleMapSvc.createSearchBox(input, true);
        }
    }
}]);