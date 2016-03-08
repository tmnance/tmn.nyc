angular.module('main').controller 'ProjectsCtrl', ($scope) ->
    @projects = [
        {
            'name': 'Sudoku Puzzle Solver/Generator'
            'technologies': ['python']
            'github_url': 'https://github.com/tmnance/sudoku-puzzler'
            'demos': [
                {
                    'name': 'Solver Demo'
                    'url': '/demo/sudoku-puzzler/solver.php'
                }
                {
                    'name': 'Generator Demo'
                    'url': '/demo/sudoku-puzzler/generator.php'
                }
            ]
        },
        {
            'name': 'Crossword Puzzle Generator'
            'technologies': ['php']
            'github_url': 'https://github.com/tmnance/crossword-generator'
            'demos': [
                {
                    'name': 'Demo'
                    'url': '/demo/crossword-generator'
                }
            ]
        }
    ]
    return
