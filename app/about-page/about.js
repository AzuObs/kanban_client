(function() {
	"use strict";

	var module = angular.module("aboutModule", []);

	module.config(["$stateProvider", function($stateProvider) {
		$stateProvider.state("kanban.about", {
			views: {
				"header@": {
					templateUrl: "app/common/header/header.html"
				},
				"state-info@": {
					templateUrl: "app/common/state-info/state-info.html",
					controller: "stateInfoCtrl"
				},
				"body@": {
					templateUrl: "app/about-page/about.html",
					controller: "aboutCtrl"
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
