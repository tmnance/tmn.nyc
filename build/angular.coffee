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
uglify = require 'gulp-uglify'
gutil = require 'gulp-util'

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
	gutil.log "Rebuilding " + gutil.colors.magenta("#{moduleName}") + " module" +
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
				path = path.replace "#{base}templates/", "#{moduleName}/"
				return path
		# .pipe concat "#{moduleName}.templates.js"
		# .pipe gulp.dest destDir

	# combine all coffee and template content into one js
	merge source, templates
		.pipe concat "#{moduleName}.js"
		.pipe gulp.dest destDir

	gutil.log "Updated file " + gutil.colors.magenta("#{destDir}/#{moduleName}.js")

	# minify if flagged as release
	if release
		gulp.src "#{destDir}/#{moduleName}.js"
			.pipe uglify
				preserveComments: 'some'
			.on 'error', buildHelper.swallowError
			.pipe rename "#{moduleName}.min.js"
			.pipe gulp.dest destDir
		gutil.log "Updated file " + gutil.colors.magenta("#{destDir}/#{moduleName}.min.js")
	return


exports.watch = ->
	gulp.watch [
		"#{sourceDir}/!(test)/**/*.coffee"
		"#{sourceDir}/!(test)/**/*.html"
		# "#{sourceDir}/images/svg/**/*.svg"
	]
	.on 'change', (file) ->
		gutil.log "File " + gutil.colors.magenta(getFilePath(file)) + " changed..."
		moduleName = buildHelper.getModuleNameForFile file, sourceDir
		buildModule moduleName
		return
	return


exports.clean = (moduleName) ->
	if moduleName
		modulePath = buildHelper.getModulePath moduleName
		del "#{destDir}/#{moduleName}.*"
	else
		del "#{destDir}/**"


getFilePath = (file) ->
	return file.path.substr(file.path.indexOf(sourceDir) + sourceDir.length + 1)












# angularLibs = [
# 	'bower_components/angular/angular.js'
# 	'bower_components/angular-animate/angular-animate.js'
# 	'bower_components/angular-growl-v2/build/angular-growl.js'
# 	'bower_components/angular-resource/angular-resource.js'
# 	'bower_components/angular-ui-router/release/angular-ui-router.js'
# 	'bower_components/angular-smart-table/dist/smart-table.js'
# 	'bower_components/angular-xeditable/dist/js/xeditable.js'
# 	'bower_components/angular-ui-select/dist/select.js'
# 	'bower_components/angular-sanitize/angular-sanitize.js'
# 	'bower_components/angular-messages/angular-messages.js'
# 	'bower_components/ng-tags-input/ng-tags-input.js'
# ]

# webWorkerLibs = [
# 	'bower_components/lodash/lodash.js'
# 	'bower_components/moment/moment.js'
# 	'bower_components/moment-range/lib/moment-range.js'
# ]

# exports.buildLibs = ->
# 	console.log "Building Angular libs"
# 	gulp.src angularLibs
# 		.pipe concat 'angular-libs.js'
# 		.pipe gulp.dest destDir
# 		.pipe uglify
# 			preserveComments: 'some'
# 		.on 'error', buildHelper.swallowError
# 		.pipe rename 'angular-libs.min.js'
# 		.pipe gulp.dest destDir

# exports.buildWebWorkerLibs = ->
# 	console.log "Building Angular libs"
# 	gulp.src webWorkerLibs
# 		.pipe concat 'web-worker-libs.js'
# 		.pipe gulp.dest "#{destDir}/web-workers"
# 		.pipe uglify
# 			preserveComments: 'some'
# 		.on 'error', buildHelper.swallowError
# 		.pipe rename 'web-worker-libs.min.js'
# 		.pipe gulp.dest "#{destDir}/web-workers"
