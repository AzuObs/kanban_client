(function() {
	"use strict";

	var module = angular.module("aboutModule", []);

	module.config(["$stateProvider", function($stateProvider) {
		$stateProvider.state("kanban.about", {
			views: {
				"navbar-view@": {
					templateUrl: "app/common/navbar/navbar.html"
				},
				"state-info-view@": {
					templateUrl: "app/common/state-info/state-info.html",
					controller: "stateInfoCtrl"
				},
				"body-view@": {
					templateUrl: "app/about-page/about.html",
					controller: "aboutCtrl"
				},"footer-view@": {
	templateUrl: "app/common/footer/footer.html"
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
