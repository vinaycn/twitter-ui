/**
 * 
 */


/**
 * 
 */


app.controller('message', ['$scope', 'UserIdService','messagesService', function($scope, UserIdService, messagesService){
	$scope.userId = UserIdService.uid;
	$scope.load = function(){	
		$scope.getMessages($scope.userId);
	};
	
	$scope.name = UserIdService.name;
	$scope.getMessages = function(id){
		messagesService.getMessages(id,function(response){
			$scope.messages = response.data;
		});
	}
}]);

app.service('messagesService', ['$http','$base64', function($http, $base64){
	
	var auth = $base64.encode("user:user");
    $http.defaults.headers.common['Authorization'] = 'Basic ' + auth;
	
	this.getMessages = function(id, callBack){
		var svcUrl = 'https://api-twitter-messenger.herokuapp.com/people/' + id + "/messages";
		
		$http({
				url : svcUrl,
				method : 'GET',
			}).then(function(response) {
				console.log(response);
				callBack(response);
			}, function(failure) {
				alert("Can not retrieve messages")
			});
		};	
	
}]);