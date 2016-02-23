(function() {
  var app;

  app = angular.module('main', ['ngRoute', 'main-templates', 'polls']);

  app.config(["$routeProvider", function($routeProvider) {
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
  }]);

}).call(this);

(function() {
  angular.module('main').controller('AboutCtrl', ["$scope", function($scope) {
    $scope.message = 'Look! I am an about page.';
  }]);

}).call(this);

(function() {
  angular.module('main').controller('ContactCtrl', ["$scope", function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
  }]);

}).call(this);

angular.module("main-templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("main/about.html","<!-- about.html --><div class=\"jumbotron text-center\"><h1>About Page</h1><p>{{ message }}</p></div>");
$templateCache.put("main/contact.html","<!-- contact.html --><div class=\"jumbotron text-center\"><h1>Contact Page</h1><p>{{ message }}</p></div>");
$templateCache.put("main/home.html","<!-- home.html --><div class=\"jumbotron text-center\"><h1>Home Page</h1><p>{{ message }}</p></div>");}]);
(function() {
  angular.module('main').controller('MainCtrl', ["$scope", function($scope) {
    $scope.message = 'Test main content!';
  }]);

}).call(this);
