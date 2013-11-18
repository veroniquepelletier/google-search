/*jslint indent: 4, browser: true, sloppy: true */
/*global angular, $, console */

angular.module('common.localization', [])
    .service('localizationService', ['localization', function (localization) {
        var language = navigator.language.toLowerCase() || navigator.userLanguage.toLowerCase();

        window.console.log('language ::' + language);

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
    .filter('i18n', ['localizationService', function (localizationService) {
        return function (key) {
            return localizationService.formatLocalization(key);
        };
    }])
