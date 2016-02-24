app = angular.module 'main', ['ngRoute', 'main-templates'] #, 'polls']

# configure our routes
app.config ($routeProvider, $locationProvider) ->
    $routeProvider
        # route for the home page
        .when('/', {
            templateUrl : 'main/home.html'
            controller: 'MainCtrl'
            controllerAs: 'mainCtrl'
        })
        # route for the about page
        .when('/about', {
            templateUrl : 'main/about.html'
            controller: 'AboutCtrl'
            controllerAs: 'aboutCtrl'
        })
        # route for the contact page
        .when('/contact', {
            templateUrl : 'main/contact.html'
            controller: 'ContactCtrl'
            controllerAs: 'contactCtrl'
        })
        # route for the contact page
        .otherwise({
            redirectTo: '/'
        })

    # use the HTML5 History API
    $locationProvider.html5Mode(true)
    return
