/**
 * 
 */


/**
 * 
 */


app.controller('message', ['$scope', 'UserIdService','messagesService', function($scope, UserIdService, messagesService){
	$scope.userId = UserIdService.uid;
	$scope.name = UserIdService.name;
	$scope.load = function(){	
		$scope.getMessages();
	};
	
	
	$scope.search;
	$scope.getMessages = function(){
		messagesService.getMessages($scope.userId,$scope.search, function(response){
			$scope.messages = response.data;
		});
	}
	

	
}]);

app.service('messagesService', ['$http','$base64', function($http, $base64){
	
	var auth = $base64.encode("user:user");
    $http.defaults.headers.common['Authorization'] = 'Basic ' + auth;
	
	this.getMessages = function(id,search, callBack){
		var svcUrl = 'https://api-twitter-messenger.herokuapp.com/people/' + id + "/messages";
		
		$http({
				url : svcUrl,
				params: {search: search},
				method : 'GET',
			}).then(function(response) {
				
				callBack(response);
			}, function(failure) {
				callBack(failure);
				
			});
		};	
	
}]);