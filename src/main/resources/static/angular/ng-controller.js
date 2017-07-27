/**
 * Angular Controller
 */

var app = angular.module('twitterClient', ['ngRoute','base64']);

app.config(['$routeProvider', function($routeProvider){
	
	//var auth = $base64.encode("user:user");
    //$httpProvider.defaults.headers.common['Authorization'] = 'Basic ' + auth;
	
	$routeProvider
	.when('/',{
		templateUrl: 'html/People.html',
		controller: 'people',
		caseInsensitiveMatch: true
	})
	.when('/my-profile', {
		templateUrl: 'html/Profile.html',
		controller: 'profile',
		caseInsensitiveMatch: true
	})
	.when('/messages', {
		templateUrl: 'html/Messages.html',
		controller: 'message',
		caseInsensitiveMatch: true
	})
	.when('/followers', {
		templateUrl: 'html/Followers.html',
		controller: 'followers',
		caseInsensitiveMatch: true
	})
	.when('/followings', {
		templateUrl: 'html/Followings.html',
		controller: 'following',
		caseInsensitiveMatch: true
	})
	.when('/others', {
		templateUrl: 'html/Others.html',
		controller: 'others',
		caseInsensitiveMatch: true
	})
	.otherwise({
		template: '<strong>No content available here..click one of the links from left panel</strong>'
	});
}]);

/*
 * global Variable service
 * 
 * 	*/
app.factory('UserIdService', function() {
    return {
        uid : '',
        name : ''
    };
});


app.controller('people', ['$scope', 'UserIdService','peopleService', function($scope, UserIdService, peopleService){
	$scope.msg = "I'm the next page";
	
	//alert("In people controller");
	$scope.sendUserId = function(person){
		UserIdService.uid = person.personId;
		UserIdService.name = person.name;
	};
	
	$scope.load = function(){
		$scope.getPeople();
	}
	
	$scope.people =[];
	
	$scope.getPeople = function(){
		peopleService.getPeople(function(response){
			$scope.people = response.data;
		});
	}
	
}]);


app.service('peopleService',['$http','$base64',function($http,$base64){
	
	
	var auth = $base64.encode("user:user");
    $http.defaults.headers.common['Authorization'] = 'Basic ' + auth;
	
	this.getPeople = function(callBack){
		alert("getting all people service");
		var svcUrl = 'https://api-twitter-messenger.herokuapp.com/people';
			$http({
				url : svcUrl,
				method : 'GET',
			}).then(function(response) {
				callBack(response);
			}, function(failure) {
				console.log(failure);
			});
		};	
	
}]);















