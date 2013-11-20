'use strict';

var app = angular.module('app', [
    'app.services',
    'app.directives',
    'app.panes.home',
    'app.panes.about',
    'app.widgets.titlebar',
    'app.widgets.search',
    'localization'
]);

app.config(['$provide', '$routeProvider', '$locationProvider', function($provide, $routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    
    $provide.factory('$routeProvider', function () {
        return $routeProvider;
    });
}]);

app.run(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '/panes/home/home.html'
    }).otherwise({
        redirectTo: '/'
    });
}]);
