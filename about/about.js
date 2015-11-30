(function() {
	"use strict";

	var module = angular.module("aboutModule", []);

	module.config(["$stateProvider", function($stateProvider) {
		$stateProvider.state("about", {
			url: "/about",
			templateUrl: "about/about.html",
			controller: "aboutCtrl"
		});
	}]);

	module.controller("aboutCtrl", ["$scope", function($scope) {
		$scope.resources = ["angularjs", "angular-ui-router", "angular-ui-bootstrap", "angular-ui-sortable",
			"angular-loading-bar", "bootstrap.css", "nodejs", "expressjs", "mongodb", "mongoose", "github", "heroku"
		];
	}]);
})();
