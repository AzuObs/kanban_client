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
		"APIServiceModule",
		"kanbanBoardListModule",
		"kanbanBoardModule",
		"kanbanUserPanelModule",
		"kanbanCategoryModule",
		"kanbanTaskModule",
		"kanbanTaskModalModule"
	]);

	app.run(["$state", "$rootScope", function($state, $rootScope) {
		// $rootScope.endPoint = "http://bigbangkanban.herokuapp.com/api";
		$rootScope.endPoint = "http://localhost:8000/api";
		$rootScope.state = $state;

		// log ui-router routing errors
		$rootScope.$on("$stateChangeError", console.log.bind(console));
	}]);


	app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/identity");

		$stateProvider.state("kanban", {
			abstract: true,
			url: "/kanban"
		});
	}]);
})();
