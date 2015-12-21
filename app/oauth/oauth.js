(function() {
	"use strict";

	var module = angular.module("oauthModule", ["oauthAPIModule", "stateInfoModule", "ui.bootstrap", "ui.router"]);


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


	module.controller("oauthCtrl", ["$log", "$scope", "oauthAPI", "$state",
		function($log, $scope, oauthAPI, $state) {
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
						$log.error(err);
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
						$log.error(err);
					});
			};
		}
	]);
})();
