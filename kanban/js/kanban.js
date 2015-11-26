(function() {
	"use strict";

	var app = angular.module("kanbanApp", [
		"ui.bootstrap",
		"ui.router",
		"ui.sortable",
		"identityModule",
		"aboutModule",
		"stateInfoModule",
		"angular-loading-bar",
		"kanbanBoardModule",
		"kanbanBoardListModule"
	]);


	app.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/identity");
	});

	app.run(function($state, $rootScope) {
		// $rootScope.endPoint = "http://bigbangkanban.herokuapp.com/api";
		$rootScope.endPoint = "http://localhost:8000/api";
		$rootScope.state = $state;
	});


	app.config(function($stateProvider) {
		$stateProvider.state("kanban", {
			abstract: true,
			url: "/kanban",
			templateUrl: "kanban/templates/kanban.html"
		});
	});
})();
