(function() {
  var app;

  app = angular.module('polls', ['ngRoute', 'polls-templates']);

  // configure our routes
  app.config(["$routeProvider", function($routeProvider) {
    // route for the about page
    $routeProvider.when('/polls', {
      templateUrl: 'polls/list.html',
      controller: 'PollsCtrl',
      controllerAs: 'pollsCtrl'
    // route for the about page
    }).when('/polls/:id', {
      templateUrl: 'polls/details.html',
      controller: 'PollsCtrl',
      controllerAs: 'pollsCtrl'
    // route for the success page
    }).when('/polls/:id/success', {
      templateUrl: 'polls/success.html',
      controller: 'PollsCtrl',
      controllerAs: 'pollsCtrl'
    // route for the poll results page
    }).when('/polls/:id/results', {
      templateUrl: 'polls/results.html',
      controller: 'PollsCtrl',
      controllerAs: 'pollsCtrl'
    }).when('/question', {
      templateUrl: 'polls/question.html',
      controller: 'PollsCtrl',
      controllerAs: 'pollsCtrl'
    });
  }]);

}).call(this);

(function() {
  angular.module('polls').controller('PollDetailsCtrl', ["$scope", "$http", "$routeParams", function($scope, $http, $routeParams) {
    var id, pollDetails;
    pollDetails = this;
    pollDetails.message = "Loading...";
    pollDetails.poll = null;
    id = $routeParams.id;
    console.log("$routeParams", $routeParams);
    if (id) {
      // load initial data
      $http.get('/api/v1/polls/' + id).success(function(results) {
        pollDetails.message = "";
        pollDetails.poll = results;
      }).error(function(results) {
        pollDetails.message = results.error || "Error!";
      });
    }
  }]);

}).call(this);

(function() {
  angular.module('polls').controller('PollsCtrl', ["$scope", "$http", "$location", function($scope, $http, $location) {
    this.message = "Loading...";
    this.polls = [];
    // load all polls as inital data
    // $http.get('/api/v1/polls').success((results) =>
    // 	@message = ""
    // 	@polls = results.data
    // 	console.log results.data
    // 	if @polls.length == 0
    // 		@message = "None entered!"
    // 	return
    // ).error(->
    // 	@message = "Error!"
    // 	return
    // )
    this.getSinglePoll = (id) => {
      $http.get('/api/v1/polls', {
        id: 2
      }).success(function(results) {
        var data;
        data = results.data[1];
        this.currentPoll = results.data;
        console.log(document.querySelector('#choice-list'));
        // console.log angular.element '#choice-list'
        this.currentPoll = data;
        this.kargoPoll = new window.KargoPoll({
          container: document.querySelector('#choice-list'),
          choices: data.options
        });
      });
    };
    window.setTimeout(this.getSinglePoll, 1000);
    // @getSinglePoll()
    this.submitNewChoice = () => {
      var data;
      data = {
        question: $state.params.id,
        choice: this.newChoice
      };
      $http.put('/api/v1/options', data);
      this.getSinglePoll($state.params.id);
    };
    // send vote
    this.submitVote = function() {
      $http.post('/api/v1/polls', this.polls[0].options).success(function() {
        $location.url('/polls/success');
      });
    };
    //show or hide add choice interface
    this.toggleAddChoice = () => {
      this.addChoice = !this.addChoice;
    };
  }]);

}).call(this);

angular.module("_polls-templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("_polls/details.html","<div><div ng-show=\"pollDetailsCtrl.message\">{{pollDetailsCtrl.message}}</div><div ng-show=\"pollDetailsCtrl.poll != null\"><h3>{{::pollDetailsCtrl.poll.name}}</h3></div></div>");
$templateCache.put("_polls/list.html","<div><div ng-show=\"pollsCtrl.message\">{{pollsCtrl.message}}</div><div ng-show=\"pollsCtrl.polls.length > 0\"><div class=\"storeMgmt-list-item\" ng-repeat=\"poll in pollsCtrl.polls track by poll.id\"><div class=\"storeMgmt-list-item-header\"><a href=\"#polls/{{::poll.id}}\">{{::poll.name}}</a><h1>Title of Poll</h1><h4>Get from PHP: What is your ideal pet?</h4><section id=\"\"><div id=\"choice-list\" class=\"choices\" data-ng-repeat=\"choice in poll.options track by choice.id\"><section class=\"row\"><div class=\"col-sm-3 v-center\"><img class=\"img-responsive\" src=\"https://cdn0.iconfinder.com/data/icons/yooicons_set09_halloween/512/pumpkin.png\"></div><div class=\"col-sm-9 v-center\"><h2>miniature schnauzer</h2></div></section></div><div id=\"choices-choice2\" class=\"choices\"><section class=\"row\"><div class=\"col-sm-3 v-center\"><img class=\"img-responsive\" src=\"http://pngimg.com/upload/pumpkin_PNG9366.png\"></div><div class=\"col-sm-9 v-center\"><h2>A. hairless cat</h2></div></section></div><div id=\"choices-choice3\" class=\"choices\"><section class=\"row\"><div class=\"col-sm-3 v-center\"><img class=\"img-responsive\" src=\"http://www.passioninlove.com/wp-content/uploads/2015/09/halloween_pumpkin_png_by_lg_design-d5hzxrf.png\"></div><div class=\"col-sm-9 v-center\"><h2>who wrote these choices?</h2></div></section></div></section></div><div class=\"add-choice\" data-ng-show=\"pollsCtrl.addChoice\"><input type=\"text\" data-ng-model=\"poll.newChoice\"><button class=\"btn btn-choice\" data-ng-click=\"pollsCtrl.addChoice()\">ADD</button></div></div><button class=\"btn btn-submit\" data-ng-click=\"pollsCtrl.submitVote()\">SUBMIT</button></div></div>");
$templateCache.put("_polls/question.html","<div><div class=\"storeMgmt-list-item\"><div class=\"storeMgmt-list-item-header\"><h3>Favorite Pup?</h3><section><div id=\"choice-list\" class=\"choices\"></div></section></div><div data-ng-show=\"pollsCtrl.addChoice\"><input type=\"text\" data-ng-model=\"pollsCtrl.currentPoll.newChoice\"><button class=\"btn btn-choice\" data-ng-click=\"pollsCtrl.submitNewChoice()\">ADD</button></div><button class=\"btn btn-submit\" data-ng-click=\"pollsCtrl.submitVote()\">SUBMIT</button></div></div>");
$templateCache.put("_polls/results.html","<h1 class=\"poll-title\">{{::poll.name}}></h1><div class=\"resultsPage-choices\"><ul data-ng-repeat=\"choice in pollsCtrl.polls[0].options\"><li><p>{{::choice.text}}</p><span style=\"width:{{choice.points}}px\"></span></li></ul></div>");
$templateCache.put("_polls/success.html","<div class=\"won\"><h3>Thanks for voting!</h3></div>");}]);