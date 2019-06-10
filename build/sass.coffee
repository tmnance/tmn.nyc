autoprefixer = require 'gulp-autoprefixer'
gulp = require 'gulp'
rename = require 'gulp-rename'
sass = require 'gulp-sass'
concat = require 'gulp-concat'
log = require 'fancy-log'
colors = require 'ansi-colors'

buildHelper = require './helper'

sourceDir = 'app/Polr/sass'
destDir = 'public/css'
# excludedModules = ['bourbon', 'neat']

exports.buildSimple = ->
	log "Building " + colors.magenta("master.css") + ".."
	gulp.src "#{sourceDir}/*.scss"
		.pipe sass
			outputStyle: 'compressed'
		.on 'error', buildHelper.swallowError
		.pipe autoprefixer
			# browsers: ['last 2 versions']
			cascade: false
		.on 'error', buildHelper.swallowError
		.pipe concat "master.css"
		# .pipe rename "master.css"
		.pipe gulp.dest destDir
	log "Building " + colors.magenta("master.css") + " complete"
	return

exports.watchSimple = ->
	gulp.watch ["#{sourceDir}/*.scss"]
		.on 'change', (filePath) ->
			log "File " + colors.magenta(getRelativeFilePath(filePath)) + " changed..."
			exports.buildSimple()
			return
	return

getRelativeFilePath = (filePath) ->
	return filePath.substr(filePath.indexOf(sourceDir) + sourceDir.length + 1)
