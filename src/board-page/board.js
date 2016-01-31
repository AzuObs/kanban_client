(function() {
	"use strict";

	var module = angular.module("boardModule", [
		"boardFactoryModule",
		"categoryModule",
		"navbarModule",
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
				"body-view@": {
					templateUrl: "board-page/board.html",
					resolve: {
						board: ["boardFactory", function(boardFactory) {
							return boardFactory.getBoard(sessionStorage.boardId);
						}]
					}
				},
				"category-view@kanban.board": {
					templateUrl: "board-page/categories/categories.html",
					controller: "categoryCtrl"
				},
				"user-menu-view@kanban.board": {
					templateUrl: "board-page/users/users.html",
					controller: "userMenuCtrl"
				},
				"task-view@kanban.board": {
					templateUrl: "board-page/tasks/tasks.html",
					controller: "taskCtrl"
				},
				"footer-view@": {
					templateUrl: "common/views/footer/footer.html"
				}
			},
			url: "/board-page/:boardName",
		});
	}]);
})();
