annotate = require 'gulp-ng-annotate'
coffee = require 'gulp-coffee'
concat = require 'gulp-concat'
del = require 'del'
gulp = require 'gulp'
htmlmin = require 'gulp-htmlmin'
merge = require 'merge-stream'
ngTemplates = require 'gulp-ng-templates'
path = require 'path'
rename = require 'gulp-rename'
# svgstore = require 'gulp-svgstore'
# svgmin = require 'gulp-svgmin'
# sourcemaps = require 'gulp-sourcemaps'
terser = require 'gulp-terser'
log = require 'fancy-log'
colors = require 'ansi-colors'

buildHelper = require './helper'

sourceDir = 'app/Polr/angular'
destDir = 'public/js/angular'
excludedModules = []


exports.buildAllModules = (release = false) ->
	modules = buildHelper.getAllModules sourceDir, excludedModules
	# console.log('modules', modules)
	for m in modules
		buildModule m.name, release
	return


buildModule = (moduleName, release = false) ->
	log "Rebuilding " + colors.magenta("#{moduleName}") + " module" +
		(if release then " for release.." else "..")

	source = gulp.src "#{sourceDir}/#{moduleName}/!(test)/**/*.coffee"
		.pipe coffee
			bare: false # true
		.on 'error', buildHelper.swallowError
		.pipe annotate
			singleQuotes: true
		# .pipe concat "#{moduleName}.js"
		# .pipe gulp.dest destDir

	templates = gulp.src "#{sourceDir}/#{moduleName}/**/templates/**/*.html"
		.pipe htmlmin {collapseWhitespace: true}
	# svgs = [] # gulp.src "#{sourceDir}/#{moduleName}/**/images/icons.svg"
	# templates = merge templates, svgs
		.pipe ngTemplates
			module: "#{moduleName}-templates"
			path: (path, base) ->
				path = path.replace "#{base}/templates/", "#{moduleName}/"
				return path
		# .pipe concat "#{moduleName}.templates.js"
		# .pipe gulp.dest destDir

	# combine all coffee and template content into one js
	merge source, templates
		.pipe concat "#{moduleName}.js"
		.pipe gulp.dest destDir

	log "Updated file " + colors.magenta("#{destDir}/#{moduleName}.js")

	# minify if flagged as release
	if release
		gulp.src "#{destDir}/#{moduleName}.js"
			.pipe terser
				output:
					comments: 'some'
			.on 'error', buildHelper.swallowError
			.pipe rename "#{moduleName}.min.js"
			.pipe gulp.dest destDir
		log "Updated file " + colors.magenta("#{destDir}/#{moduleName}.min.js")
	return


exports.watch = ->
	gulp.watch [
		"#{sourceDir}/!(test)/**/*.coffee"
		"#{sourceDir}/!(test)/**/*.html"
		"!#{sourceDir}/_*/**/*.*"
		# "#{sourceDir}/images/svg/**/*.svg"
	]
	.on 'change', (filePath) ->
		log "File " + colors.magenta(getRelativeFilePath(filePath)) + " changed..."
		moduleName = buildHelper.getModuleNameForFilePath filePath, sourceDir
		buildModule moduleName
		return
	return


exports.clean = (moduleName) ->
	if moduleName
		modulePath = buildHelper.getModulePath moduleName
		del "#{destDir}/#{moduleName}.*"
	else
		del "#{destDir}/**"


getRelativeFilePath = (filePath) ->
	return filePath.substr(filePath.indexOf(sourceDir) + sourceDir.length + 1)
