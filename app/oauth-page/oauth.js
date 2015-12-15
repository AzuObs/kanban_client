(function() {
	"use strict";

	var module = angular.module("oauthModule", []);


	module.config(["$httpProvider", "$stateProvider", function($httpProvider, $stateProvider) {
		$httpProvider.interceptors.push(function() {
			return {
				request: function(req) {
					if (sessionStorage.token) {
						req.headers.token = sessionStorage.token;
					}
					return req;
				}
			};
		});


		$stateProvider.state("kanban.oauth", {
			views: {
				"navbar@": {
					templateUrl: "app/common/navbar/navbar.html"
				},
				"state-info@": {
					templateUrl: "app/common/state-info/state-info.html",
					controller: "stateInfoCtrl"
				},
				"body@": {
					templateUrl: "app/oauth-page/oauth.html",
					controller: "oauthCtrl"
				}
			},
			url: "/identity"
		});
	}]);


	module.controller("oauthCtrl", ["$scope", "oauthService", "$state",
		function($scope, oauthService, $state) {
			$scope.newAccUsr = "";
			$scope.newAccPwd = "";
			$scope.newAccPwdVerify = "";

			$scope.logginUsername = "sheldon";
			$scope.logginPwd = "123";

			$scope.createUser = function() {
				oauthService
					.createUser($scope.newAccUsr, $scope.newAccPwd)
					.then(function(res) {
						sessionStorage.userId = res.user._id;
						sessionStorage.token = res.token;
						$state.go("kanban.boardList", {
							username: res.user.username
						});
					}, function(err) {
						console.log(err);
					});
			};


			$scope.authenticate = function() {
				oauthService
					.authenticate($scope.logginUsername, $scope.logginPwd)
					.then(function(res) {
						sessionStorage.userId = res.user._id;
						sessionStorage.token = res.token;

						$state.go("kanban.boardList", {
							username: res.user.username
						});
					}, function(err) {
						console.log(err);
					});

			};
		}
	]);

})();
