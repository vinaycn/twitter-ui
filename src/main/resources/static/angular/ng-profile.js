/**
 * 
 */

app.controller('profile', ['$scope', 'UserIdService','profileService', function($scope, UserIdService,profileService){
	$scope.userId = UserIdService.uid;
	
	$scope.load = function(){
		$scope.getPersonProfile($scope.userId);
	}
	
	$scope.getPersonProfile = function(id){
		profileService.getPersonProfile(id,function(response){
			if(response.status==200)
			    $scope.person = response.data;
			else
				alert("Something Went wrong please try again later.")
		});
	}
}]);





app.service('profileService',['$http','$base64',function($http,$base64){
	
	
	var auth = $base64.encode("user:user");
    $http.defaults.headers.common['Authorization'] = 'Basic ' + auth;
	
	this.getPersonProfile = function(id,callBack){
		
		var svcUrl = 'https://api-twitter-messenger.herokuapp.com/people/' + id;
			$http({
				url : svcUrl,
				method : 'GET',
			}).then(function(response) {
				callBack(response);
			}, function(failure) {
				callBack(failure);
			});
		};	
	
}]);