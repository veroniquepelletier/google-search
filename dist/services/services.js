/*jslint indent: 4, browser: true, sloppy: true */
/*global angular, $, console */

var module = angular.module('app.services', []);

module.service('localizationSvc', ['localization', function (localization) {
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
}]);

module.filter('i18n', ['localizationSvc', function (localizationSvc) {
    return function (key) {
        return localizationSvc.formatLocalization(key);
    };
}]);

module.service('googleMapSvc', ['$rootScope', function ($rootScope) {
    var mapOptions = {
        zoom: 10,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    },
    markers = [];
    
    
    
    /* private methods */
    
    function showPosition(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        if ($rootScope.map) {
            $rootScope.map.setCenter(new google.maps.LatLng(lat, lng));
        } else {
        }
    }
    
    function onAddMarkers() {
        window.console.log('place changed');
        var places = $rootScope.searchBox.getPlaces();
    
        for (var i = 0, marker; marker = markers[i]; i++) {
            marker.setMap(null);
        }
    
        // For each place, get the icon, place name, and location.
        markers = [];
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, place; place = places[i]; i++) {
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
        var options = {timeout:6000};
        
        function onError(err) {
            if(err.code == 1) {
                alert("Error: Access is denied!");
            }else if( err.code == 2) {
              alert("Error: Position is unavailable!");
            }
        }
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, onError, options);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
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
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
            $rootScope.searchBox = new google.maps.places.SearchBox(input);
            if (addMarkers) {
                // add listener to the search box and add marker
                google.maps.event.addListener($rootScope.searchBox, 'places_changed', onAddMarkers);
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
