(function() {
	"use strict";

	var aboutModule = angular.module("aboutModule", []);

	aboutModule.config(function($stateProvider) {
		$stateProvider.state("about", {
			url: "/about",
			templateUrl: "about/about.html",
			controller: "aboutCtrl"
		});
	});

	aboutModule.controller("aboutCtrl", function($scope) {
		$scope.resources = ["angularjs", "angular-ui-router", "angular-ui-bootstrap", "angular-ui-sortable",
			"angular-loading-bar", "bootstrap.css", "nodejs", "expressjs", "mongodb", "mongoose", "github", "heroku"
		];
	});

})();
