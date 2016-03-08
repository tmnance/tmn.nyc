app = angular.module 'main', ['ngRoute', 'main-templates', 'analytics', 'navigation'] #, 'polls']

# configure our routes
app.config ($routeProvider, $locationProvider) ->
    $routeProvider
        .when('/', {
            title: 'Home'
            templateUrl : 'main/home.html'
            controller: 'HomeCtrl'
            controllerAs: 'homeCtrl'
        })
        .when('/projects', {
            title: 'Projects'
            templateUrl : 'main/projects.html'
            controller: 'ProjectsCtrl'
            controllerAs: 'projectsCtrl'
        })
        .when('/about', {
            title: 'About'
            templateUrl : 'main/about.html'
            controller: 'AboutCtrl'
            controllerAs: 'aboutCtrl'
        })
        .when('/contact', {
            title: 'Contact'
            templateUrl : 'main/contact.html'
            controller: 'ContactCtrl'
            controllerAs: 'contactCtrl'
        })
        # treat as homepage
        .otherwise({
            redirectTo: '/'
        })

    # use the HTML5 History API
    $locationProvider.html5Mode(true)
    return

app.run ['$rootScope', ($rootScope) ->
    $rootScope.$on '$routeChangeSuccess', (e, current, previous) ->
        $rootScope.title = current.$$route.title + ' - tmn.nyc'
    return
]
