angular.module('app.panes.about', []).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/about', {
        templateUrl: '/panes/about/about.html',
        scope: true
    });
}]);