app = angular.module 'analytics', ['ng']

app.run ['$rootScope', '$location', '$window', ($rootScope, $location, $window) ->
    console.log('barnrun!')
    $rootScope.$on '$viewContentLoaded', (e) ->
        if !$window.ga
            return
        $window.ga('send', 'pageview', { page: $location.path() })
        return
    return
]
