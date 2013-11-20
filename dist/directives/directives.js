var module = angular.module('app.directives', []);

module.directive('googlemap', ['googleMapSvc', function (googleMapSvc) {
    var id = 'map-canvas';
    return {
        restrict: 'E',
        template: "<div id='" + id + "' style='width: 100%; height: 100%'></div>",
        link: function () {
            googleMapSvc.createMap(id);
            googleMapSvc.setCurrentLocation();
        }
    }
}]);