(function() {
	"use strict";

	var module = angular.module("oauthModule", [
		"userFactoryModule",
		"navbarModule",
		"stateInfoModule",
		"ui.bootstrap",
		"ui.router"
	]);


	module.config(["$stateProvider", function($stateProvider) {
		$stateProvider.state("kanban.oauth", {
			views: {
				"navbar-view@": {
					templateUrl: "common/views/navbar/navbar.html",
					controller: "navbarCtrl"
				},
				"state-info-view@": {
					templateUrl: "common/views/state-info/state-info.html",
					controller: "stateInfoCtrl"
				},
				"body-view@": {
					templateUrl: "oauth-page/oauth.html",
					controller: "oauthCtrl"
				},
				"footer-view@": {
					templateUrl: "common/views/footer/footer.html"
				}
			},
			url: "/identity"
		});
	}]);


	module.controller("oauthCtrl", ["$log", "$scope", "userFactory", "$state",
		function($log, $scope, userFactory, $state) {
			$scope.newAccUsr = "";
			$scope.newAccPwd = "";
			$scope.newAccPwdVerify = "";
			$scope.loginUsername = "sheldon";
			$scope.loginPwd = "123";

			$scope.createUser = function() {
				userFactory.createUser($scope.newAccUsr, $scope.newAccPwd);
			};

			$scope.authenticate = function() {
				userFactory.authenticate($scope.loginUsername, $scope.loginPwd);
			};
		}
	]);
})();
