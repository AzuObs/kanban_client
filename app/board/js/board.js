(function() {
	"use strict";

	var module = angular.module("kanbanBoardModule", []);


	module.config(["$stateProvider", function($stateProvider) {
		$stateProvider.state("kanban.board", {
			views: {
				"header@": {
					templateUrl: "app/common/header/header.html"
				},
				"state-info@": {
					templateUrl: "app/common/state-info/state-info.html",
					controller: "stateInfoCtrl"
				},
				"body@": {
					templateUrl: "app/board/html/abstract-board.html",
					controller: "kanbanBoardCtrl",
					resolve: {
						user: ["APIService", function(APIService) {
							return APIService.getUser(sessionStorage.userId);
						}],
						board: ["APIService", function(APIService) {
							return APIService.getBoard(sessionStorage.boardId);
						}]
					}
				},
				"category-view@kanban.board": {
					templateUrl: "app/board/html/board.category.html",
					controller: "kanbanCategoryCtrl"
				},
				"userpanel-view@kanban.board": {
					templateUrl: "app/board/html/board.user-panel.html",
					controller: "kanbanUserPanelCtrl"
				},
				"task-view@kanban.board": {
					templateUrl: "app/board/html/board.task.html",
					controller: "kanbanTaskCtrl"
				}
			},
			url: "/board/:boardName"
		});
	}]);


	//used by userPanel, task, and comments
	module.directive("kbUser", function() {
		return {
			restrict: "E",
			replace: true,
			templateUrl: "app/board/html/board.user.directive.html"
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
