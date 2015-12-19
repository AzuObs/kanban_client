(function() {
	"use strict";

	var module = angular.module("oauthModule", ["ui.router", "oauthAPIModule"]);


	module.config(["$stateProvider", function($stateProvider) {
		$stateProvider.state("kanban.oauth", {
			views: {
				"navbar-view@": {
					templateUrl: "common/navbar/navbar.html"
				},
				"state-info-view@": {
					templateUrl: "common/state-info/state-info.html",
					controller: "stateInfoCtrl"
				},
				"body-view@": {
					templateUrl: "oauth/oauth.html",
					controller: "oauthCtrl"
				},
				"footer-view@": {
					templateUrl: "common/footer/footer.html"
				}
			},
			url: "/identity"
		});
	}]);


	module.controller("oauthCtrl", ["$scope", "oauthAPI", "$state",
		function($scope, oauthAPI, $state) {
			$scope.newAccUsr = "";
			$scope.newAccPwd = "";
			$scope.newAccPwdVerify = "";

			$scope.loginUsername = "sheldon";
			$scope.loginPwd = "123";

			$scope.createUser = function() {
				oauthAPI
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
				oauthAPI
					.authenticate($scope.loginUsername, $scope.loginPwd)
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
