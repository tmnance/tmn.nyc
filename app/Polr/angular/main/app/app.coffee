app = angular.module 'main', ['ngRoute', 'main-templates'] #, 'polls']

# configure our routes
app.config ($routeProvider, $locationProvider) ->
    $routeProvider
        .when('/', {
            templateUrl : 'main/home.html'
            controller: 'MainCtrl'
            controllerAs: 'mainCtrl'
        })
        .when('/projects', {
            templateUrl : 'main/projects.html'
            controller: 'ProjectsCtrl'
            controllerAs: 'projectsCtrl'
        })
        .when('/about', {
            templateUrl : 'main/about.html'
            controller: 'AboutCtrl'
            controllerAs: 'aboutCtrl'
        })
        .when('/contact', {
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
