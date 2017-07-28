/**
 * 
 */


app.controller('followers', ['$scope', 'UserIdService','followersService', function($scope, UserIdService, followersService){
	$scope.userId = UserIdService.uid;
	$scope.name = UserIdService.name;
	$scope.load = function(){	
		$scope.getPersonFollowers($scope.userId);
	};
	
	$scope.followers = [];
	
	
	$scope.getPersonFollowers = function(id){
		followersService.getFollowers(id,function(response){
			$scope.followers = response.data;
		});
	}
	
	
	$scope.follow = function(idt){
		followersService.follow($scope.userId,idt,function(response){
			if(response.status==201){
				$scope.getPersonFollowers($scope.userId);
			}else{
				alert("Sorry Something went wrong! Cant process your request");
				$scope.getPersonFollowers($scope.userId);
			}
			
		});
	};
	
	$scope.unfollow = function(idt){
		followersService.unfollow($scope.userId,idt,function(response){
			if(response.status==204){
				$scope.getPersonFollowers($scope.userId);
			}
			else{
				alert("Sorry Something went wrong! Cant process your request");
				$scope.getPersonFollowers($scope.userId);
			}
		});
	};
	
}]);

app.service('followersService', ['$http','$base64', function($http, $base64){
	
	var auth = $base64.encode("user:user");
    $http.defaults.headers.common['Authorization'] = 'Basic ' + auth;
	
	this.getFollowers = function(id, callBack){
		var svcUrl = 'https://api-twitter-messenger.herokuapp.com/people/' + id + "/followers";
		
		$http({
				url : svcUrl,
				method : 'GET',
			}).then(function(response) {
				console.log(response);
				callBack(response);
			}, function(failure) {
				console.log(failure);
			});
		};	
		
	this.follow = function(id,idt, callBack){
		var svcUrl = 'https://api-twitter-messenger.herokuapp.com/people/' + id + "/followers/" + idt ;
		
		$http({
				url : svcUrl,
				method : 'POST',
			}).then(function(response) {
				callBack(response);
			}, function(failure) {
				callBack(failure);
			});
		};	
		
	this.unfollow = function(id,idt, callBack){
		var svcUrl = 'https://api-twitter-messenger.herokuapp.com/people/' + id + "/followers/" + idt ;
		
		$http({
				url : svcUrl,
				method : 'DELETE',
			}).then(function(response) {
				callBack(response);
			}, function(failure) {
				callBack(failure);
			});
		};	
	
}]);