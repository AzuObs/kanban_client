(function() {
	"use strict";

	var kanbanMod = angular.module("kanbanModule", [
		"ui.sortable",
		"kanbanBoardModule",
		"kanbanBoardListModule"
	]);


	kanbanMod.config(function($stateProvider) {
		$stateProvider.state("kanban", {
			abstract: true,
			url: "/kanban",
			templateUrl: "kanban/templates/kanban.html"
		});
	});
})();
