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
			$scope.userSortOpts = {
				horizontal: true,
				tolerance: "pointer",
				connectWith: ".user-list",
				activate: function(e, ui) {


				},
				update: function(e, ui) {
					for (var i = 0; i < ui.item.sortable.droptargetModel.length; i++) {
						if (ui.item.sortable.droptargetModel[i]._id === ui.item.sortable.model._id) {
							$log.log("duplicate already exist in that list of task users");
							ui.item.sortable.cancel();
						}
					}
				},
				stop: function(e, ui) {

					//transfer whole use over to duplicate, not just the ID
					$scope.users = $scope.board.admins.concat($scope.board.members);
					$scope.updateBoard();

				}
			};
		}
	]);

})();
