fs = require 'fs'
gutil = require 'gulp-util'
moment = require 'moment'
path = require 'path'

exports.getModuleNameForFilePath = (filePath, sourceDirectory) ->
	currentPath = path.relative sourceDirectory, filePath
	while currentPath
		parent = path.dirname currentPath
		grandparent = path.dirname parent
		if grandparent is '.'
			return parent # path.basename currentPath
		else
			currentPath = parent

exports.getModulePath = (module, sourceDirectory) ->
	directories = getSubdirectories sourceDirectory
	for dir in directories
		subdirectories = getSubdirectories "#{sourceDirectory}/#{dir}"
		for subdir in subdirectories
			if subdir is module
				return "#{dir}/#{subdir}"
	return null

# exports.getAllModules = (sourceDir, excludedModules) ->
# 	allModules = []
# 	directories = getSubdirectories sourceDir
# 	for dir in directories
# 		subDirs = getSubdirectories "#{sourceDir}/#{dir}"
# 		for subDir in subDirs
# 			if !isExluded subDir, excludedModules
# 				allModules.push subDir
# 	return allModules
exports.getAllModules = (sourceDir, excludedModules=[], excludedSubModules=[]) ->
	allModules = []
	directories = getSubdirectories sourceDir
	for dir in directories
		if !isExluded dir, excludedModules
			module = {
				'name': dir
				# 'subModules': []
			}
			# subDirs = getSubdirectories "#{sourceDir}/#{dir}"
			# for subDir in subDirs
			# 	if !isExluded subDir, excludedSubModules
			# 		module.subModules.push subDir
			allModules.push module
	return allModules

exports.padRight = (str, len, char = ' ') ->
	return str + Array(len - str.length + 1).join(char)

isExluded = (moduleName, excludedModules) ->
	for ex in excludedModules
		if ex is moduleName
			return true
	return false

exports.getSubdirectories = getSubdirectories = (dir) ->
	return fs.readdirSync(dir).filter (file) ->
		return fs.statSync(path.join(dir, file)).isDirectory() and file isnt 'test'

exports.swallowError = (error) ->
	console.error error.toString()
	this.emit 'end'
