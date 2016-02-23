app = angular.module 'polls', ['ngRoute', 'polls-templates']

# configure our routes
app.config ($routeProvider) ->
    $routeProvider
        # route for the about page
        .when('/polls', {
            templateUrl : 'polls/list.html'
            controller: 'PollsCtrl'
            controllerAs: 'pollsCtrl'
        })
        # route for the about page
        .when('/polls/:id', {
            templateUrl : 'polls/details.html'
            controller: 'PollsCtrl'
            controllerAs: 'pollsCtrl'
        })
        # route for the success page
        .when('/polls/:id/success', {
            templateUrl : 'polls/success.html'
            controller: 'PollsCtrl'
            controllerAs: 'pollsCtrl'
        })
        # route for the poll results page
        .when('/polls/:id/results', {
            templateUrl : 'polls/results.html'
            controller: 'PollsCtrl'
            controllerAs: 'pollsCtrl'
        })
        .when('/question', {
            templateUrl : 'polls/question.html'
            controller: 'PollsCtrl'
            controllerAs: 'pollsCtrl'
        })

    return
