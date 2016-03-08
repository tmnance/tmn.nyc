app = angular.module 'navigation', ['ng']

app.run ['$rootScope', '$location', '$window', ($rootScope, $location, $window) ->
    # TODO [TN 3/8/16] kinda hacky, may want to fix eventually to be cleaner
    $rootScope.$on '$viewContentLoaded', (e) ->
        active_path = $location.path()
        # /projects to ['projects']
        active_path_parts = active_path.substr(1).split('/')
        active_path = '/' + (
            if active_path_parts.length > 0
                active_path_parts[0]
            else
                ''
        )
        $('header nav li').each(->
            is_active = ($(@).find('a').attr('href') == active_path)
            $(@).toggleClass('active', is_active)
            return
        )
        return
    return
]
