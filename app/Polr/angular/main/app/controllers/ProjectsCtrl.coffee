angular.module('main').controller 'ProjectsCtrl', ($scope) ->
    @projects = [
        {
            'name': 'Crossword Puzzle Generator'
            'github_url': 'https://github.com/tmnance/crossword-generator'
            'demo_url': '/demo/crossword-generator'
        }
    ]
    return
