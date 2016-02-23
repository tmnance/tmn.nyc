angular.module('main').controller 'ContactCtrl', ($scope) ->
    @links = [
        {
            'name': 'Github'
            'url': 'https://github.com/tmnance'
        },
        {
            'name': 'LinkedIn'
            'url': 'https://www.linkedin.com/in/tmnance'
        }
    ]
    return
