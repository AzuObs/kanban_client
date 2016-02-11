(function() {
	"use strict";

	var module = angular.module("oauthModule", [
		"boardListModule",
		"navbarModule",
		"ui.bootstrap",
		"ui.router",
		"userFactoryModule",
		"environmentModule",
	]);


	module.config(["$stateProvider", function($stateProvider) {
		$stateProvider.state("kanban.oauth", {
			views: {
				"navbar-view@": {
					templateUrl: "common/views/navbar/navbar.html",
					controller: "navbarCtrl"
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


	module.controller("oauthCtrl", [
		"$scope", "userFactory", "ENV",
		function($scope, userFactory, ENV) {

			$scope.createUser = function() {
				userFactory.createUser($scope.newAccUsr, $scope.newAccPwd);
			};


			$scope.authenticate = function() {
				userFactory.authenticate($scope.loginUsername, $scope.loginPwd);
			};


			$scope.newAccUsr = "";
			$scope.newAccPwd = "";
			$scope.newAccPwdVerify = "";
			$scope.loginUsername = "Sheldon";
			$scope.loginPwd = "123";
			$scope.createAccIsEnabled = (ENV.appState === "development");
		}
	]);
})();
