(function() {
	"use strict";

	var module = angular.module("kanbanApp", [
		"ui.bootstrap",
		"ui.router",
		"ui.sortable",
		"navbarModule",
		"aboutModule",
		"stateInfoModule",
		"angular-loading-bar",
		"oauthModule",
		"oauthAPIModule",
		"boardAPIModule",
		"boardListModule",
		"boardModalModule",
		"boardModule",
		"categoryModule",
		"categoryDirectiveModule",
		"userMenuModule",
		"userDirectiveModule",
		"userModalModule",
		"taskModule",
		"taskDirectiveModule",
		"taskModalModule"
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

	module.run(["$rootScope", "$state", function($rootScope, $state) {
		// $rootScope.endPoint = "http://bigbangkanban.herokuapp.com/api";
		$rootScope.endPoint = "http://localhost:8000/api";
		$rootScope.state = $state;

		// log ui-router routing errors
		$rootScope.$on("$stateChangeError", console.log.bind(console));
	}]);
})();