(function() {
	"use strict";

	var module = angular.module("oauthModule", [
		"userAPIModule",
		"navbarModule",
		"stateInfoModule",
		"ui.bootstrap",
		"ui.router"
	]);


	module.config(["$stateProvider", function($stateProvider) {
		$stateProvider.state("kanban.oauth", {
			views: {
				"navbar-view@": {
					templateUrl: "common/navbar/navbar.html",
					controller: "navbarCtrl"
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


	module.controller("oauthCtrl", ["$log", "$scope", "userAPI", "$state",
		function($log, $scope, userAPI, $state) {
			$scope.newAccUsr = "";
			$scope.newAccPwd = "";
			$scope.newAccPwdVerify = "";
			$scope.loginUsername = "sheldon";
			$scope.loginPwd = "123";

			$scope.createUser = function() {
				userAPI.createUser($scope.newAccUsr, $scope.newAccPwd);
			};

			$scope.authenticate = function() {
				userAPI.authenticate($scope.loginUsername, $scope.loginPwd);
			};
		}
	]);
})();
