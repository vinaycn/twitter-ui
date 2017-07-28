/**
 * 
 */


app.controller('following', ['$scope', 'UserIdService','followingService', function($scope, UserIdService, followingService){
	$scope.userId = UserIdService.uid;
	$scope.name = UserIdService.name;
	$scope.load = function(){	
		$scope.getFollowing($scope.userId);
	};
	
	
	$scope.getFollowing = function(id){
		followingService.getFollowing(id,function(response){
			$scope.following = response.data;
		});
	}
	
	$scope.unfollow = function(idt){
		followingService.unfollow($scope.userId,idt, function(response){
			if(response.status==204){
				$scope.getFollowing($scope.userId);
			}
			else{
				alert("Sorry Something went wrong! Cant process your request");
				$scope.getFollowing($scope.userId);
			}
			
		});
	};
}]);

app.service('followingService', ['$http','$base64', function($http, $base64){
	
	var auth = $base64.encode("user:user");
    $http.defaults.headers.common['Authorization'] = 'Basic ' + auth;
	
	this.getFollowing = function(id, callBack){
		var svcUrl = 'https://api-twitter-messenger.herokuapp.com/people/' + id + "/following";
		
		$http({
				url : svcUrl,
				method : 'GET',
			}).then(function(response) {
				console.log(response);
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