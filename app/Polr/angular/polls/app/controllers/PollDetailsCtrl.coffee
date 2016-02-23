angular.module('polls').controller 'PollDetailsCtrl', ($scope, $http, $routeParams) ->
	pollDetails = this
	pollDetails.message = "Loading..."
	pollDetails.poll = null
	id = $routeParams.id
	console.log("$routeParams", $routeParams)

	if id
		# load initial data
		$http.get('/api/v1/polls/' + id).success((results) ->
			pollDetails.message = ""
			pollDetails.poll = results
			return
		).error((results) ->
			pollDetails.message = results.error || "Error!"
			return
		)
	return
