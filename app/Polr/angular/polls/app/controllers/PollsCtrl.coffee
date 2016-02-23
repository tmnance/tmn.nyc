angular.module('polls').controller 'PollsCtrl', ($scope, $http, $location) ->
	@message = "Loading..."
	@polls = []

	# load all polls as inital data
	# $http.get('/api/v1/polls').success((results) =>
	# 	@message = ""
	# 	@polls = results.data
	# 	console.log results.data
	# 	if @polls.length == 0
	# 		@message = "None entered!"
	# 	return
	# ).error(->
	# 	@message = "Error!"
	# 	return
	# )

	@getSinglePoll = (id) =>
		$http.get('/api/v1/polls', {id: 2}).success (results) ->
			data = results.data[1]
			@currentPoll = results.data
			console.log document.querySelector('#choice-list')
			# console.log angular.element '#choice-list'
			@currentPoll = data
			@kargoPoll = new window.KargoPoll
				container: document.querySelector('#choice-list'),
				choices: data.options
			return
		return
	window.setTimeout @getSinglePoll, 1000

	# @getSinglePoll()

	@submitNewChoice = =>
		data =
			question: $state.params.id
			choice: @newChoice

		$http.put('/api/v1/options', data)
		@getSinglePoll $state.params.id
		return

 	# send vote
 	@submitVote = ->
 		$http.post('/api/v1/polls', @polls[0].options).success ->
 			$location.url '/polls/success'
 			return
 		return

 	#show or hide add choice interface
 	@toggleAddChoice = =>
 		@addChoice = !@addChoice
 		return

	return
