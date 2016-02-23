gulp = require 'gulp'
# autoprefixer = require 'gulp-autoprefixer'
concat = require 'gulp-concat'
coffee = require 'gulp-coffee'
# gulpif = require 'gulp-if'
rename = require 'gulp-rename'
sass = require 'gulp-sass'
# symlink = require 'gulp-symlink'
uglify = require 'gulp-uglify'
minifyCss = require 'gulp-minify-css'
# merge = require 'merge-stream'
# karma = require('karma').server
argv = require('yargs').argv
gutil = require 'gulp-util'
exec = require('child_process').exec

buildAngular = require './build/angular'
buildHelper = require './build/helper'
buildSass = require './build/sass'

libs = {
	css: [
		'bower_components/bootstrap/dist/css/bootstrap.css'
	]
	js: [
		'bower_components/angular/angular.js'
		'bower_components/angular-route/angular-route.js'
		'bower_components/jquery/dist/jquery.js'
		'bower_components/moment/moment.js'
		'bower_components/moment-range/lib/moment-range.js'
		# 'bower_components/lodash/lodash.js'
		# 'bower_components/Keypress/keypress.js'
		'bower_components/bootstrap/dist/js/bootstrap.js'
		# 'bower_components/bootstrap-select/js/bootstrap-select.js'
	]
	fonts: [
		'bower_components/bootstrap/fonts/*'
	]
}

dest =
	commonCss: 'public/css/common'
	commonJs: 'public/js/common'
	appJS: 'public/js/app'
	fonts: 'public/css/fonts'

gulp.task 'libs', ->
	gulp.src libs.css
		.pipe concat 'libs.css'
		.pipe gulp.dest dest.commonCss
		.pipe minifyCss()
		.on 'error', buildHelper.swallowError
		.pipe rename 'libs.min.css'
		.pipe gulp.dest dest.commonCss
	gulp.src libs.js
		.pipe concat 'libs.js'
		.pipe gulp.dest dest.commonJs
		.pipe uglify
			preserveComments: 'some'
		.on 'error', buildHelper.swallowError
		.pipe rename 'libs.min.js'
		.pipe gulp.dest dest.commonJs
	gulp.src libs.fonts
		.pipe gulp.dest dest.fonts
	return

# gulp.task 'link', ->
# 	gulp.src 'bower_components/bourbon/dist'
# 		.pipe symlink 'sass/bourbon',
# 			force: true
# 		.pipe symlink 'sass/angular/common/bourbon',
# 			force: true

# 	gulp.src 'bower_components/neat/app/assets/stylesheets'
# 		.pipe symlink 'sass/neat',
# 			force: true
# 		.pipe symlink 'sass/angular/common/neat',
# 			force: true

gulp.task 'angular:clean', ->
	buildAngular.clean()

# gulp.task 'angular:libs', ->
# 	buildAngular.buildLibs()

# gulp.task 'angular:worker-libs', ->
# 	buildAngular.buildWebWorkerLibs()

gulp.task 'watch', ->
	buildAngular.watch()
	buildSass.watchSimple()
	return

gulp.task 'angular', ->
	release = argv.r
	buildAngular.buildAllModules(release)
	return

gulp.task 'sass', ->
	# if module = argv.m
	# 	buildSass.buildModule module
	# else
	# 	buildSass.buildModule()
	buildSass.buildSimple()
	return

gulp.task 'migrate', (cb) ->
	exec 'php artisan migrate', (err, stdout, stderr) ->
		gutil.log stdout if stdout
		gutil.log stderr if stderr
		cb err
		return
	return

gulp.task 'migrate:refresh', (cb) ->
	exec 'composer dump-autoload; php artisan migrate:refresh', (err, stdout, stderr) ->
		gutil.log stdout if stdout
		gutil.log stderr if stderr
		cb err
		return
	return

# gulp.task 'angular', ->
# 	release = argv.r
# 	buildAngular.buildModule argv.m, release

# gulp.task 'build-all', ->
# 	buildAngular.buildModule undefined, true
# 	buildSass.buildModule undefined, true

gulp.task 'default', ['help']
gulp.task 'help', ->
	padLength = 25
	gutil.log '========== Gulpfile Usage =========='
	gutil.log buildHelper.padRight('Command', padLength) + 'Description'
	commands = {
		'angular': 'Build all angular module js'
		'angular -r': 'Build all for release'
		'angular:clean': 'Clear all angular generated js files (will need to be re-built)'
		# 'angular:libs': 'Stuff'
		# 'angular:worker-libs': 'Stuff'
		# 'build-all': 'Stuff'
		'help': 'Show gulp commands for this project'
		'libs': 'Combine library js into single minified/non-minified libs.js'
		# 'link': 'Stuff'
		'sass': 'Compile sass source into css'
		'migrate': 'Migrate DB updates'
		'watch': 'Watch sass and coffee resources for changes'
	}
	for k, v of commands
		gutil.log gutil.colors.magenta(buildHelper.padRight(k, padLength)) + gutil.colors.cyan(v)
	return

