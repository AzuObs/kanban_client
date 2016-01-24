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
			$scope.error = errorHandler.getError();
			$scope.title = "Error - Undefined Error";
			$scope.subtitle = "An unexpected error occured.";
			$scope.redirectMsg = "GO TO LOGIN";


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


					case "Not Found":
						$scope.redirectClick = function() {
							$state.go("kanban.oauth");
						};
						$scope.title = "404 - Not found";
						$scope.subtitle = "The requested content could not be retrieved.";
						$scope.redirectMsg = "GO TO LOGIN";
						break;

					case "Internal Server Error":
						$scope.redirectClick = function() {
							$state.go("kanban.oauth");
						};
						$scope.title = "500 - Internal Server Error";
						$scope.subtitle = "An error happened on the server's end.";
						$scope.redirectMsg = "GO TO LOGIN";
						break;

					case "State Change Error":
						$scope.redirectClick = function() {
							$state.go("kanban.oauth");
						};
						$scope.title = "500 - Internal Server Error";
						$scope.subtitle = "An error happened on the server's end.";
						$scope.redirectMsg = "GO TO LOGIN";
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
