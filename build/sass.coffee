autoprefixer = require 'gulp-autoprefixer'
gulp = require 'gulp'
rename = require 'gulp-rename'
sass = require 'gulp-sass'
concat = require 'gulp-concat'
gutil = require 'gulp-util'

buildHelper = require './helper'

sourceDir = 'app/Polr/sass'
destDir = 'public/css'
# excludedModules = ['bourbon', 'neat']

exports.buildSimple = ->
	gutil.log "Building " + gutil.colors.magenta("master.css") + ".."
	gulp.src "#{sourceDir}/*.scss"
		.pipe sass
			outputStyle: 'compressed'
		.on 'error', buildHelper.swallowError
		.pipe autoprefixer
			browsers: ['last 2 versions']
			cascade: false
		.on 'error', buildHelper.swallowError
		.pipe concat "master.css"
		# .pipe rename "master.css"
		.pipe gulp.dest destDir
	gutil.log "Building " + gutil.colors.magenta("master.css") + " complete"
	return

exports.watchSimple = ->
	gulp.watch ["#{sourceDir}/*.scss"]
		.on 'change', (file) ->
			gutil.log "File " + gutil.colors.magenta(getFilePath(file)) + " changed..."
			exports.buildSimple()
			return
	return

getFilePath = (file) ->
	return file.path.substr(file.path.indexOf(sourceDir) + sourceDir.length + 1)


# exports.buildModule = (moduleName) ->
# 	if moduleName
# 		buildModule moduleName
# 	else
# 		buildAllModules()

# exports.watch = ->
# 	gulp.watch ["#{sourceDir}/**/*.scss"]
# 		.on 'change', (file) ->
# 			moduleName = buildHelper.getModuleNameForFile file, sourceDir
# 			buildModule moduleName

# buildAllModules = ->
# 	modules = buildHelper.getAllModules sourceDir, excludedModules
# 	for m in modules
# 		buildModule m

# buildModule = (moduleName) ->
# 	console.log "Building #{moduleName}"

# 	if moduleName
# 		modulePath = buildHelper.getModulePath moduleName, sourceDir

# 		gulp.src "#{sourceDir}/#{modulePath}/master.scss"
# 			.pipe sass
# 				outputStyle: 'compressed'
# 			.on 'error', buildHelper.swallowError
# 			.pipe autoprefixer
# 				browsers: ['last 2 versions']
# 				cascade: false
# 			.on 'error', buildHelper.swallowError
# 			.pipe rename "#{moduleName}.css"
# 			.pipe gulp.dest destDir
