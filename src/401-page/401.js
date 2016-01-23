(function() {
	"use strict";
	var module = angular.module("401Module", []);

	module.config(["$stateProvider", function($stateProvider) {
		$stateProvider.state("kanban.401", {
			views: {
				"navbar-view@": {
					templateUrl: "common/views/navbar/navbar.html",
					controller: "navbarCtrl"
				},
				"body-view@": {
					templateUrl: "401-page/401.html",
					controller: "aboutCtrl"
				},
				"footer-view@": {
					templateUrl: "common/views/footer/footer.html"
				}
			},
			url: "/401"
		});
	}]);
})();
