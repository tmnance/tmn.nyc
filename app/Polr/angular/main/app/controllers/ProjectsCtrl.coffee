angular.module('main').controller 'ProjectsCtrl', ($scope) ->
    @projects = [
        {
            'name': 'HabitPanda - Habit Building iOS App'
            'technologies': ['swift']
            'links': [
                {
                    'name': 'Website'
                    'url': 'https://habitpanda.app'
                }
                {
                    'name': 'App Store Link'
                    'url': 'https://itunes.apple.com/app/apple-store/id1466306659'
                }
            ]
        }
        {
            'name': 'Sudoku Puzzle Solver/Generator'
            'technologies': ['python']
            'links': [
                {
                    'name': 'Github'
                    'url': 'https://github.com/tmnance/sudoku-puzzler'
                }
                {
                    'name': 'Solver Demo'
                    'url': '/demo/sudoku-puzzler/solver.php'
                    'link_text': 'Click here to see demo'
                }
                {
                    'name': 'Generator Demo'
                    'url': '/demo/sudoku-puzzler/generator.php'
                    'link_text': 'Click here to see demo'
                }
            ]
        }
        {
            'name': 'Crossword Puzzle Generator'
            'technologies': ['php']
            'links': [
                {
                    'name': 'Github'
                    'url': 'https://github.com/tmnance/crossword-generator'
                }
                {
                    'name': 'Demo'
                    'url': '/demo/crossword-generator'
                    'link_text': 'Click here to see demo'
                }
            ]
        }
    ]
    return
