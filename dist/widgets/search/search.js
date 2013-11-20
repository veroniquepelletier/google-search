var widget = angular.module('app.widgets.search', []);

module.directive('search', ['googleMapSvc', function (googleMapSvc) {
    var id = 'search-input';
    return {
        restrict: 'EA',
        scope: true,
        templateUrl: 'widgets/search/search.html',
        link: function () {
            var input = document.getElementById(id);
            googleMapSvc.createSearchBox(input, true);
        }
    }
}]);