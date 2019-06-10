(function() {
  var app;

  app = angular.module('analytics', ['ng']);

  app.run([
    '$rootScope',
    '$location',
    '$window',
    function($rootScope,
    $location,
    $window) {
      $rootScope.$on('$viewContentLoaded',
    function(e) {
        if (!$window.ga) {
          return;
        }
        $window.ga('send',
    'pageview',
    {
          page: $location.path()
        });
      });
    }
  ]);

}).call(this);

(function() {
  var app;

  app = angular.module('main', [
    'ngRoute',
    'main-templates',
    'analytics',
    'navigation' //, 'polls']
  ]);

  
  // configure our routes
  app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
      title: 'Home',
      templateUrl: 'main/home.html',
      controller: 'HomeCtrl',
      controllerAs: 'homeCtrl'
    }).when('/projects', {
      title: 'Projects',
      templateUrl: 'main/projects.html',
      controller: 'ProjectsCtrl',
      controllerAs: 'projectsCtrl'
    }).when('/about', {
      title: 'About',
      templateUrl: 'main/about.html',
      controller: 'AboutCtrl',
      controllerAs: 'aboutCtrl'
    }).when('/contact', {
      title: 'Contact',
      templateUrl: 'main/contact.html',
      controller: 'ContactCtrl',
      controllerAs: 'contactCtrl'
    // treat as homepage
    }).otherwise({
      redirectTo: '/'
    });
    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  }]);

  app.run([
    '$rootScope',
    function($rootScope) {
      $rootScope.$on('$routeChangeSuccess',
    function(e,
    current,
    previous) {
        return $rootScope.title = current.$$route.title + ' - tmn.nyc';
      });
    }
  ]);

}).call(this);

(function() {
  var app;

  app = angular.module('navigation', ['ng']);

  app.run([
    '$rootScope',
    '$location',
    '$window',
    function($rootScope,
    $location,
    $window) {
      // TODO [TN 3/8/16] kinda hacky, may want to fix eventually to be cleaner
      $rootScope.$on('$viewContentLoaded',
    function(e) {
        var active_path,
    active_path_parts;
        active_path = $location.path();
        // /projects to ['projects']
        active_path_parts = active_path.substr(1).split('/');
        active_path = '/' + (active_path_parts.length > 0 ? active_path_parts[0] : '');
        $('header nav li').each(function() {
          var is_active;
          is_active = $(this).find('a').attr('href') === active_path;
          $(this).toggleClass('active',
    is_active);
        });
      });
    }
  ]);

}).call(this);

angular.module("main-templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("main/about.html","<div class=\"jumbotron text-center\"><h1>About</h1><p>Coming soon...</p></div>");
$templateCache.put("main/contact.html","<div class=\"jumbotron text-center\"><h1>Contact</h1><div class=\"contact-list-item\" ng-repeat=\"link in contactCtrl.links track by link.url\">{{ link.name }} &mdash;<a href=\"{{ link.url }}\" target=\"_blank\">{{ link.url }}</a></div></div>");
$templateCache.put("main/home.html","<div class=\"jumbotron text-center\"><p>Feel free to take a look around!</p><p><img src=\"/images/profile.jpg\" alt=\"Profile\" style=\"width: 250px;\"></p></div>");
$templateCache.put("main/projects.html","<div class=\"jumbotron text-center\"><h1>Projects</h1><div class=\"contact-list-item\" ng-repeat=\"project in projectsCtrl.projects\"><h2>{{ project.name }} ({{project.technologies.join(\', \')}})</h2><div>Github &mdash;<a href=\"{{ project.github_url }}\" target=\"_blank\">{{ project.github_url }}</a></div><div ng-repeat=\"demo in project.demos track by demo.url\">{{ demo.name }} &mdash;<a href=\"{{ demo.url }}\" target=\"_blank\">Click here to see demo</a></div></div></div>");}]);
(function() {
  angular.module('main').controller('AboutCtrl', ["$scope", function($scope) {}]);

  // $scope.message = 'Look! I am an about page.'

}).call(this);

(function() {
  angular.module('main').controller('ContactCtrl', ["$scope", function($scope) {
    this.links = [
      {
        'name': 'Github',
        'url': 'https://github.com/tmnance'
      },
      {
        'name': 'LinkedIn',
        'url': 'https://www.linkedin.com/in/tmnance'
      }
    ];
  }]);

}).call(this);

(function() {
  angular.module('main').controller('HomeCtrl', ["$scope", function($scope) {}]);

  // $scope.message = 'Test main content!'

}).call(this);

(function() {
  angular.module('main').controller('ProjectsCtrl', ["$scope", function($scope) {
    this.projects = [
      {
        'name': 'Sudoku Puzzle Solver/Generator',
        'technologies': ['python'],
        'github_url': 'https://github.com/tmnance/sudoku-puzzler',
        'demos': [
          {
            'name': 'Solver Demo',
            'url': '/demo/sudoku-puzzler/solver.php'
          },
          {
            'name': 'Generator Demo',
            'url': '/demo/sudoku-puzzler/generator.php'
          }
        ]
      },
      {
        'name': 'Crossword Puzzle Generator',
        'technologies': ['php'],
        'github_url': 'https://github.com/tmnance/crossword-generator',
        'demos': [
          {
            'name': 'Demo',
            'url': '/demo/crossword-generator'
          }
        ]
      }
    ];
  }]);

}).call(this);
