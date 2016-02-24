(function() {
  var app;

  app = angular.module('main', ['ngRoute', 'main-templates']);

  app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
      templateUrl: 'main/home.html',
      controller: 'MainCtrl',
      controllerAs: 'mainCtrl'
    }).when('/about', {
      templateUrl: 'main/about.html',
      controller: 'AboutCtrl',
      controllerAs: 'aboutCtrl'
    }).when('/contact', {
      templateUrl: 'main/contact.html',
      controller: 'ContactCtrl',
      controllerAs: 'contactCtrl'
    }).otherwise({
      redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
  }]);

}).call(this);

(function() {
  angular.module('main').controller('AboutCtrl', ["$scope", function($scope) {}]);

}).call(this);

(function() {
  angular.module('main').controller('ContactCtrl', ["$scope", function($scope) {
    this.links = [
      {
        'name': 'Github',
        'url': 'https://github.com/tmnance'
      }, {
        'name': 'LinkedIn',
        'url': 'https://www.linkedin.com/in/tmnance'
      }
    ];
  }]);

}).call(this);

angular.module("main-templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("main/about.html","<!-- about.html --><div class=\"jumbotron text-center\"><h1>About</h1><p>Coming soon...</p></div>");
$templateCache.put("main/contact.html","<!-- contact.html --><div class=\"jumbotron text-center\"><h1>Contact</h1><!-- <h2>Links</h2> --><div class=\"contact-list-item\" ng-repeat=\"link in contactCtrl.links track by link.url\">{{ link.name }} &mdash; <a href=\"{{ link.url }}\" target=\"_blank\">{{ link.url }}</a></div></div>");
$templateCache.put("main/home.html","<!-- home.html --><div class=\"jumbotron text-center\"><h1>Home</h1><img src=\"/images/construction.gif\" alt=\"Under construction\"><p>Coming soon...</p></div>");}]);
(function() {
  angular.module('main').controller('MainCtrl', ["$scope", function($scope) {
    $scope.message = 'Test main content!';
  }]);

}).call(this);
