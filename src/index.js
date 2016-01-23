(function() {
	"use strict";

	var module = angular.module("kanbanApp", [
		"ui.router",
		"aboutModule",
		"boardModule",
		"boardListModule",
		"oauthModule",
		"navbarModule",
		"angular-loading-bar",
		"errorPagesModule"
	]);


	module.config(["$stateProvider", "$locationProvider", "$urlRouterProvider", "$httpProvider",
		function($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) {
			$urlRouterProvider.otherwise("/kanban/404");

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
				console.log.bind(console);
				$state.go("kanban.401");
			});
		}
	]);
})();
