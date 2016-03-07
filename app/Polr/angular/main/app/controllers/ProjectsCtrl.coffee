angular.module('main').controller 'ProjectsCtrl', ($scope) ->
    @projects = [
        {
            'name': 'Sudoku Puzzle Generator'
            'technologies': ['python']
            'github_url': 'https://github.com/tmnance/sudoku-generator'
            'demo_url': '/demo/sudoku-generator'
        },
        {
            'name': 'Crossword Puzzle Generator'
            'technologies': ['php']
            'github_url': 'https://github.com/tmnance/crossword-generator'
            'demo_url': '/demo/crossword-generator'
        }
    ]
    return
