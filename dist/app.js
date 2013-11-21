/*! google search api demo - v1.0 - 2013-11-21
* copyright (c) 2013 Veronique Pelletier; all rights reserved */
angular.module("app.templates", []).run(["$templateCache", function($templateCache) {

  $templateCache.put("app.html",
    "<html ng-app=\"app\">" +
    "    <body>" +
    "        <div class='app'>" +
    "            <div class='view' ng-view></div>" +
    "        </div>" +
    "    </body>" +
    "</html>"
  );

  $templateCache.put("../panes/about/about.html",
    "<div class='about-pane'>" +
    "    About" +
    "</div>"
  );

  $templateCache.put("../panes/home/home.html",
    "<div class='home-pane'>" +
    "    <search></search>" +
    "    <googlemap></googlemap>" +
    "</div>" +
    ""
  );

  $templateCache.put("../widgets/search/search.html",
    "<div class='widget-search' ng-cloak>" +
    "    <form class=\"form-inline\" role=\"form\">" +
    "        <div class=\"form-group\">" +
    "            <input id=\"search-input\" type=\"text\" class=\"form-control\" placeholder=\"{{'SEARCH' | i18n}}\">" +
    "        </div>" +
    "    </form>" +
    "</div>"
  );

  $templateCache.put("../widgets/titlebar/titlebar.html",
    "<div class='widget-titlebar'>" +
    "    <nav class=\"navbar navbar-default\" role=\"navigation\">" +
    "        <div class=\"navbar-header\">" +
    "            <a class=\"navbar-brand\">{{'APP_TITLE' | i18n}}</a>" +
    "        </div>" +
    "        <div class='button-group' ng-repeat='item in navigation' ng-click=\"onClick(item)\">" +
    "            <button type=\"button\" class=\"btn btn-primary btn-large\">{{item.name | i18n}}</button>" +
    "      </div>" +
    "    </nav>" +
    "</div>" +
    ""
  );

}]);

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
angular.module('app.panes.about', []).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/about', {
        templateUrl: '/panes/about/about.html',
        scope: true
    });
}]);
angular.module('app.panes.home', []).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: '/panes/home/home.html',
        scope: true
    });
}]);
angular.module('app.services', [])
.service('localizationSvc', ['localization', function (localization) {
    var language = navigator.language.toLowerCase() || navigator.userLanguage.toLowerCase();

    function trimString (string) {
        return string.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    };

    return {
        formatLocalization: function (args) {
            var key = (args instanceof Array)
                ? args[0]
                : args;

            if(key
                && localization[key]
                && localization[key][language]){

                return localization[trimString(key)][language];
            } else {
                return key;
            }
        }
    };
}])
.filter('i18n', ['localizationSvc', function (localizationSvc) {
    return function (key) {
        return localizationSvc.formatLocalization(key);
    };
}])
.service('googleMapSvc', ['$rootScope', function ($rootScope) {
    var mapOptions = {
        zoom: 10,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    },
    markers = [];
    
    
    /* private methods */
    
    function showPosition(position) {
        var lat = (position) ? position.coords.latitude : 45.503123;
        var lng = (position) ? position.coords.longitude : -73.544922;
        if ($rootScope.map) {
            $rootScope.map.setCenter(new google.maps.LatLng(lat, lng));
        } else {
            $rootScope.$watch('map', function (map) {
                if (map) {
                    map.setCenter(new google.maps.LatLng(lat, lng));
                }
            });
        }
    }
    
    function onAddMarkers() {
        var places = $rootScope.searchBox.getPlaces();
    
        for (var i = 0, marker; marker = markers[i]; i += 1) {
            marker.setMap(null);
        }
    
        // For each place, get the icon, place name, and location.
        markers = [];
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, place; place = places[i]; i += 1) {
            var image = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };
    
            // Create a marker for each place.
            var marker = new google.maps.Marker({
                map: $rootScope.map,
                icon: image,
                title: place.name,
                position: place.geometry.location
            });
    
            markers.push(marker);
    
            bounds.extend(place.geometry.location);
        }
    
        $rootScope.map.fitBounds(bounds);
    }
    
    /* public methods */
    
    function setCurrentLocation() {
        var options = {timeout:1000};
        
        function onError(err) {
            if(err.code == 1) {
                alert("Error: Access is denied!");
            }else if( err.code == 2) {
              alert("Error: Position is unavailable!");
            }
        }
        
        showPosition();
        /* Not working well on node webkit */
        /*
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, onError, options);
        } else {
            window.console.log("Geolocation is not supported by this browser.");
        }
        */
    
    }
    function createMap(id) {
        $rootScope.map = new google.maps.Map(document.getElementById(id), mapOptions);
    }
    
    /**
     * Creates a search box
     * @param {input} input text box html node
     * @param {addMarkers} bool true if we add markers
     */
    function createSearchBox(input, addMarkers) {
        
        function addSearchBox(map){
            if (!$rootScope.searchBox) {
                $rootScope.searchBox = new google.maps.places.SearchBox(input);
                map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
                if (addMarkers) {
                    // add listener to the search box and add marker
                    google.maps.event.addListener($rootScope.searchBox, 'places_changed', onAddMarkers);
                }
            }
        }
        
        if (!$rootScope.map) {
            // a map is being created or can be created, wait for it
            $rootScope.$watch('map', function (map) {
                if (map) {
                    addSearchBox(map);
                }
            });
        } else {
            // we have a map loaded
            addSearchBox($rootScope.map);
        }
    }
    
    return {
        createMap: createMap,
        createSearchBox: createSearchBox,
        setCurrentLocation: setCurrentLocation
    }
}]);

angular.module('app.widgets.search', []).directive('search', ['googleMapSvc', function (googleMapSvc) {
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

angular.module("localization", []).service("localization", function () {
   return {
        "SEARCH": {
            "en-us": "Search location",
            "fr-ca": "Rechercher un endroit"
        },
        "APP_TITLE": {
            "en-us": "Search engine",
            "fr-ca": "Engin de recherche"
        },
        "ABOUT": {
            "en-us": "About",
            "fr-ca": "A propos"
        },
        "HOME": {
            "en-us": "Home",
            "fr-ca": "Accueil"
        },
        "SOURCE": {
            "en-us": "Source code",
            "fr-ca": "Code source"
        },
        "STYLES": {
            "en-us": "Styles",
            "fr-ca": "styles"
        },
        "LIB": {
            "en-us": "Librairies",
            "fr-ca": "Librairies"
        },
        "TMPL": {
            "en-us": "Templates",
            "fr-ca": "Modeles"
        }
    }
});

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
