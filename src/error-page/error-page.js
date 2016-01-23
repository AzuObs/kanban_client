(function() {
	"use strict";
	var module = angular.module("errorPageModule", ["errorHandlerModule"]);

	module.config(["$stateProvider", function($stateProvider) {
		$stateProvider.state("kanban.error", {
			views: {
				"navbar-view@": {
					templateUrl: "common/views/navbar/navbar.html",
					controller: "navbarCtrl"
				},
				"body-view@": {
					templateUrl: "error-page/error-page.html",
					controller: "errorPageCtrl"
				},
				"footer-view@": {
					templateUrl: "common/views/footer/footer.html"
				}
			},
			url: "/error"
		});
	}]);


	module.controller("errorPageCtrl", [
		"$scope", "$state", "$window", "errorHandler",
		function($scope, $state, $window, errorHandler) {
			$scope.redirectClick = function() {
				$state.go("kanban.oauth");
			};
			$scope.title = "Error - Undefined Error";
			$scope.subtitle = "An unexpected error occured.";
			$scope.redirectMsg = "GO TO LOGIN";

			$scope.error = errorHandler.getError();
			$scope.$watch("error.counter", function() {
				switch ($scope.error.value) {
					case "Unauthorized":
						$scope.redirectClick = function() {
							$state.go("kanban.oauth");
						};
						$scope.title = "401 - Unauthorized Access";
						$scope.subtitle = "You tried to access content that you were not allowed to.";
						$scope.redirectMsg = "GO TO LOGIN";
						break;


					case "Not found":
						$scope.redirectClick = function() {
							$window.history.back();
						};
						$scope.title = "404 - Not found";
						$scope.subtitle = "The requested content could not be found.";
						$scope.redirectMsg = "GO BACK";
						break;

					default:
						$scope.redirectClick = function() {
							$state.go("kanban.oauth");
						};
						$scope.title = "Error - Undefined Error";
						$scope.subtitle = "An unexpected error occured.";
						$scope.redirectMsg = "GO TO LOGIN";
				}
			});
		}
	]);
})();
