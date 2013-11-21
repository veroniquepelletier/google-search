angular.module('app.widgets.titlebar', []).directive('titlebar', [function () {
    return {
        restrict: 'EA',
        scope: true,
        templateUrl: 'widgets/titlebar/titlebar.html',
        replace: false,
        link: function(scope) {
            scope.navigation = [
                {name: "SOURCE", file: 'app.js'},
                {name: "STYLES", file: 'styles.css'},
                {name: "LIB", file: 'app-lib.js'}
            ];
            scope.onClick = function (item) {
                if (item.file) {
                    window.open(item.file);
                }
            }
        }
    }
}]);
