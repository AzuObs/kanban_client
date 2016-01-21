(function() {
	"use strict";

	var module = angular.module("boardModule", [
		"boardAPIModule",
		"navbarModule",
		"stateInfoModule",
		"ui.bootstrap",
		"ui.router",
		"ui.sortable"
	]);

	module.config(["$stateProvider", function($stateProvider) {
		$stateProvider.state("kanban.board", {
			views: {
				"navbar-view@": {
					templateUrl: "common/navbar/navbar.html",
					controller: "navbarCtrl"
				},
				"state-info-view@": {
					templateUrl: "common/state-info/state-info.html",
					controller: "stateInfoCtrl"
				},
				"body-view@": {
					templateUrl: "board/board.html",
					controller: "boardCtrl",
					resolve: {
						board: ["boardAPI", function(boardAPI) {
							return boardAPI.getBoard(sessionStorage.boardId);
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
					templateUrl: "common/footer/footer.html"
				}
			},
			url: "/board/:boardName",
		});
	}]);

	module.controller("boardCtrl", [
		"$rootScope", "$scope", "$log", "$modal", "board", "boardAPI",
		function($rootScope, $scope, $log, $modal, board, boardAPI) {

			var USER_SELECTION_HEIGHT = 150;
			$scope.userSortOpts = {
				appendTo: "body",
				connectWith: ".user-list",
				cursor: "move",
				cursorAt: {
					left: 16,
					top: 16
				},
				helper: "clone",
				horizontal: true,
				scroll: false,
				tolerance: "pointer",
				activate: function(e, ui) {
					if (e.clientY < USER_SELECTION_HEIGHT) {
						$(ui.placeholder[0]).css("display", "none");
						$(ui.helper.prevObject[0]).css("display", "block");
					}
					$(ui.placeholder[0]).css("margin", "0px");
					$scope.showUserList = true;
				},
				change: function(e, ui) {
					if (e.clientY > USER_SELECTION_HEIGHT) {
						$(ui.placeholder[0]).css("display", "block");
					} else {
						$(ui.placeholder[0]).css("display", "none");
					}
				},
				update: function(e, ui) {
					// cancel duplicates
					for (var i = 0; i < ui.item.sortable.droptargetModel.length; i++) {
						if (ui.item.sortable.droptargetModel[i]._id === ui.item.sortable.model._id) {
							$log.error("duplicate already exists in that list of task users");
							ui.item.sortable.cancel();
						}
					}
				},
				beforeStop: function(e, ui) {
					$scope.showUserList = false;
				},
				stop: function(e, ui) {
					$scope.users = $scope.board.admins.concat($scope.board.members);
					boardAPI.updateBoard();
				}
			};

			$scope.board = board;
			$scope.users = boardAPI.getBoardUsers();
			$scope.showUserList = false;
		}
	]);
})();
