'use strict';

var app = angular.module('app', [
    'app.services',
    'app.directives',
    'app.panes.home',
    'app.panes.about',
    'app.widgets.titlebar',
    'localization'
]);

app.config(['$provide', '$routeProvider', function($provide, $routeProvider) {
    $provide.factory('$routeProvider', function () {
        return $routeProvider;
    });
}]);

app.run(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '/panes/home/home.html'
    }).when('/about', {
        templateUrl: '/panes/about/about.html'
    }).otherwise({
        redirectTo: '/'
    });
}]);
