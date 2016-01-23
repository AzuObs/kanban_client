(function() {
	"use strict";
	var module = angular.module("errorPagesModule", []);

	module.config(["$stateProvider", function($stateProvider) {
		$stateProvider.state("kanban.401", {
			views: {
				"navbar-view@": {
					templateUrl: "common/views/navbar/navbar.html",
					controller: "navbarCtrl"
				},
				"body-view@": {
					templateUrl: "error-pages/error-pages.html",
					controller: "401Ctrl"
				},
				"footer-view@": {
					templateUrl: "common/views/footer/footer.html"
				}
			},
			url: "/401"
		});

		$stateProvider.state("kanban.404", {
			views: {
				"navbar-view@": {
					templateUrl: "common/views/navbar/navbar.html",
					controller: "navbarCtrl"
				},
				"body-view@": {
					templateUrl: "error-pages/error-pages.html",
					controller: "404Ctrl"
				},
				"footer-view@": {
					templateUrl: "common/views/footer/footer.html"
				}
			},
			url: "/404"
		});
	}]);


	module.controller("401Ctrl", ["$scope", "$state", function($scope, $state) {
		$scope.redirectClick = function() {
			$state.go("kanban.oauth");
		};

		$scope.title = "401 Error - Unauthorized Access";
		$scope.subtitle = "You tried to access content that you are not allowed to.";
		$scope.redirectMsg = "GO BACK";
	}]);


	module.controller("404Ctrl", ["$scope", "$window", function($scope, $window) {
		$scope.redirectClick = function() {
			$window.history.back();
		};

		$scope.title = "404 Error - Content Not Found";
		$scope.subtitle = "The content that you are trying to access could not be found.";
		$scope.redirectMsg = "GO BACK";
	}]);
})();
