(function() {
	"use strict";

	var app = angular.module("kanbanApp", [
		"ui.bootstrap",
		"ui.router",
		"ui.sortable",
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

	app.run(["$state", "$rootScope", function($state, $rootScope) {
		// $rootScope.endPoint = "http://bigbangkanban.herokuapp.com/api";
		$rootScope.endPoint = "http://localhost:8000/api";
		$rootScope.state = $state;

		// log ui-router routing errors
		$rootScope.$on("$stateChangeError", console.log.bind(console));
	}]);


	app.config(["$stateProvider", "$urlRouterProvider", "$httpProvider",
		function($stateProvider, $urlRouterProvider, $httpProvider) {
			$urlRouterProvider.otherwise("/kanban/identity");

			$stateProvider.state("kanban", {
				abstract: true,
				url: "/kanban"
			});

			// send the token with everyrequest if it is present
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
})();
