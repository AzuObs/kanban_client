(function() {
	"use strict";

	var module = angular.module("kanbanBoardModule", []);


	module.config(["$stateProvider", function($stateProvider) {
		$stateProvider.state("kanban.board", {
			views: {
				"": {
					templateUrl: "/kanban/html/abstract-board.html",
					controller: "kanbanBoardCtrl"
				},
				"category-list@kanban.board": {
					templateUrl: "/kanban/html/board.category.html",
					controller: "kanbanCategoryCtrl"
				},
				"userpanel@kanban.board": {
					templateUrl: "/kanban/html/board.user-panel.html",
					controller: "kanbanUserPanelCtrl"
				},
				"task-list@kanban.board": {
					templateUrl: "/kanban/html/board.task.html",
					controller: "kanbanTaskCtrl"
				}
			},
			url: "/board/:boardName",
			resolve: {
				user: ["APIService", function(APIService) {
					return APIService.getUser(sessionStorage.userId);
				}],
				board: ["APIService", function(APIService) {
					return APIService.getBoard(sessionStorage.boardId);
				}]
			}
		});
	}]);


	//used by userPanel, task, and comments
	module.directive("kbUser", function() {
		return {
			restrict: "E",
			replace: true,
			templateUrl: "kanban/html/board.user.directive.html"
		};
	});


	module.controller("kanbanBoardCtrl", ["$scope", "$log", "$modal", "user", "board", "APIService",
		function($scope, $log, $modal, user, board, APIService) {

			// used in categoryCtrl, taskCtrl, userPanerCtrl, commentModalCtrl
			$scope.user = user;
			$scope.board = board;
			$scope.users = $scope.board.admins.concat($scope.board.members);
			$scope.showUserList = false;
			// used by categoryCtrl, taskCtrl and userPanelCtrl
			$scope.updateBoard = function() {
				APIService
					.updateBoard($scope.board)
					.then(function(res) {
						$scope.board._v++;
					}, function(err) {
						$log.log(err);
					});
			};

			// used by tasks and userPanel (connectedList)
			var USER_SELECTION_HEIGHT = 150;

			$scope.userSortOpts = {
				horizontal: true,
				cursor: "move",
				helper: "clone",
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
							$log.log("duplicate already exist in that list of task users");
							ui.item.sortable.cancel();
						}
					}
				},
				beforeStop: function(e, ui) {
					$scope.showUserList = false;
				},
				stop: function(e, ui) {
					$scope.users = $scope.board.admins.concat($scope.board.members);


					$scope.updateBoard();
				}
			};
		}
	]);

})();
