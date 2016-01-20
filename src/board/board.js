(function() {
	"use strict";

	var module = angular.module("boardModule", [
		"serverAPIModule",
		"navbarModule",
		"stateInfoModule",
		"ui.bootstrap",
		"ui.router",
		"ui.sortable"
	]);

	module.constant("USER_SELECTION_HEIGHT", 150);

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
						user: ["serverAPI", function(serverAPI) {
							return serverAPI.getUser(sessionStorage.userId);
						}],
						board: ["serverAPI", function(serverAPI) {
							return serverAPI.getBoard(sessionStorage.boardId);
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

	module.controller("boardCtrl", ["$scope", "$log", "$modal", "board", "user", "serverAPI",
		function($scope, $log, $modal, board, user, serverAPI, USER_SELECTION_HEIGHT) {
			// used in categoryCtrl, taskCtrl, userPanerCtrl, commentModalCtrl
			$scope.user = user;
			$scope.board = board;
			$scope.users = $scope.board.admins.concat($scope.board.members);
			$scope.showUserList = false;

			// used by categoryCtrl, taskCtrl and userMenuCtrl
			$scope.board.update = function() {
				serverAPI
					.updateBoard($scope.board)
					.then(function(res) {
						$scope.board._v++;
					}, function(err) {
						$log.error(err);
					});
			};

			// used by tasks and userMenu (connectedList)
			$scope.userSortOpts = {
				horizontal: true,
				cursor: "move",
				helper: "clone",
				scroll: false,
				cursorAt: {
					left: 16,
					top: 16
				},
				tolerance: "pointer",
				connectWith: ".user-list",
				activate: function(e, ui) {
					if (e.clientY < USER_SELECTION_HEIGHT) {
						$(ui.placeholder[0]).css("display", "none"); //hide placeholder
						$(ui.helper.prevObject[0]).css("display", "block"); //show clone
					}
					$(ui.placeholder[0]).css("margin", "0px");
					$scope.showUserList = true;
				},
				change: function(e, ui) {
					if (e.clientY < USER_SELECTION_HEIGHT) {
						$(ui.placeholder[0]).css("display", "none");
					} else {
						$(ui.placeholder[0]).css("display", "block");
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
					$scope.board.update();
				}
			};
		}
	]);
})();
