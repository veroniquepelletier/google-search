angular.module('app.directives', []).directive('googlemap', ['googleMapSvc', function (googleMapSvc) {
    var id = 'map-canvas';
    return {
        restrict: 'E',
        template: "<div id='" + id + "' style='width: 800px; height: 750px'></div>",
        link: function () {
            googleMapSvc.createMap(id);
            googleMapSvc.setCurrentLocation();
        }
    }
}]);