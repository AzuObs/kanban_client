(function() {
	"use strict";

	var module = angular.module("aboutModule", [
		"stateInfoModule",
		"ui.router",
		"navbarModule",
		"aboutModule",
		"stateInfoModule"
	]);

	module.config(["$stateProvider", function($stateProvider) {
		$stateProvider.state("kanban.about", {
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
					templateUrl: "about/about.html",
					controller: "aboutCtrl"
				},
				"footer-view@": {
					templateUrl: "common/views/footer/footer.html"
				}

			},
			url: "/about"
		});
	}]);

	module.controller("aboutCtrl", ["$scope", function($scope) {
		$scope.resources = ["angularjs", "angular-ui-router", "angular-ui-bootstrap", "angular-ui-sortable",
			"angular-loading-bar", "bootstrap.css", "nodejs", "expressjs", "mongodb", "mongoose", "github", "heroku"
		];
	}]);
})();
