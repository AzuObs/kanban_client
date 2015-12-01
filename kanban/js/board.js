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
						$scope.board = res;
					}, function(err) {
						$log.log(err);
					});
			};

			// used by tasks and userPanel (connectedList)
			$scope.userSortOpts = {
				horizontal: true,
				placeholder: ".task",
				connectWith: ".user-list", //OK

				stop: function(e, ui) {
					// debugger;
					if ($(e.target).hasClass('user-selection') &&
						ui.item.sortable.droptarget &&
						e.target != ui.item.sortable.droptarget[0]) {
						console.log("ping");
						var ids = ui.item.sortable.droptarget[0].id;
						var cId = ids.substring(2, ids.search(" "));
						var tId = ids.substring(ids.search("t:") + 2, ids.length);
						var wId = ui.item.sortable.model._id;


						// $scope.users = $scope.boardusers.slice();??
						$scope.updateBoard();
					}
				}
			};
		}
	]);

})();
