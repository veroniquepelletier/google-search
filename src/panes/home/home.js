angular.module('app.panes.home', []).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: '/panes/home/home.html',
        scope: true
    });
}]);