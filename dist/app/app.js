angular.module('app', [
    'app.services',
    'app.directives',
    'app.panes.home',
    'app.panes.about',
    'app.widgets.titlebar',
    'app.widgets.search',
    'localization'
])
.config(['$provide', '$routeProvider', function($provide, $routeProvider) {
    $provide.factory('$routeProvider', function () {
        return $routeProvider;
    });
}])
.run(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'panes/home/home.html'
    }).otherwise({
        redirectTo: '/'
    });
}]);
