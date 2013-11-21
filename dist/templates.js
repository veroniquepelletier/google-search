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
