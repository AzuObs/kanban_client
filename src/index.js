(function() {
	"use strict";

	var module = angular.module("kanbanApp", [
		"ui.router",
		"aboutModule",
		"boardModule",
		"boardListModule",
		"oauthModule",
		"navbarModule",
		"angular-loading-bar"
	]);

	module.config(["$stateProvider", "$urlRouterProvider", "$httpProvider",
		function($stateProvider, $urlRouterProvider, $httpProvider) {
			$urlRouterProvider.otherwise("/kanban/identity");

			$stateProvider.state("kanban", {
				abstract: true,
				url: "/kanban"
			});

			$httpProvider.interceptors.push(function() {
				return {
					request: function(req) {
						if (sessionStorage.token) {
							req.headers.token = sessionStorage.token;
						}
						return req;
					}
				};
			});
		}
	]);

	module.run([
		"$rootScope", "$state",
		function($rootScope, $state) {
			$rootScope.state = $state;

			// log ui-router routing errors
			$rootScope.$on("$stateChangeError", function() {
				$state.go("kanban.oauth");
			});
		}
	]);
})();
