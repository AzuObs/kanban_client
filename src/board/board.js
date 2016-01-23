(function() {
	"use strict";

	var module = angular.module("boardModule", [
		"boardFactoryModule",
		"navbarModule",
		"stateInfoModule",
		"taskModule",
		"ui.bootstrap",
		"ui.router",
		"ui.sortable",
		"userMenuModule"
	]);

	module.config(["$stateProvider", function($stateProvider) {
		$stateProvider.state("kanban.board", {
			views: {
				"navbar-view@": {
					templateUrl: "common/views/navbar/navbar.html",
					controller: "navbarCtrl"
				},
				"state-info-view@": {
					templateUrl: "common/views/state-info/state-info.html",
					controller: "stateInfoCtrl"
				},
				"body-view@": {
					templateUrl: "board/board.html",
					resolve: {
						required: ["boardFactory", function(boardFactory) {
							return boardFactory.getBoard(sessionStorage.boardId);
						}]
					}
				},
				"category-view@kanban.board": {
					templateUrl: "board/categories/categories.html",
					controller: "categoryCtrl"
				},
				"user-menu-view@kanban.board": {
					templateUrl: "board/users/users.html",
					controller: "userMenuCtrl"
				},
				"task-view@kanban.board": {
					templateUrl: "board/tasks/tasks.html",
					controller: "taskCtrl"
				},
				"footer-view@": {
					templateUrl: "common/views/footer/footer.html"
				}
			},
			url: "/board/:boardName",
		});
	}]);
})();
