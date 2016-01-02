(function() {
	"use strict";

	var module = angular.module("boardListModule", [
		"boardAPIModule",
		"navbarModule",
		"stateInfoModule",
		"ui.bootstrap",
		"ui.router"
	]);


	module.config(["$stateProvider", function($stateProvider) {
		$stateProvider.state("kanban.boardList", {
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
					templateUrl: "board-list/board-list.html",
					controller: "boardListCtrl",
					resolve: {
						user: ["boardAPI", function(boardAPI) {
							return boardAPI.getUser(sessionStorage.userId);
						}],
						boards: ["boardAPI", function(boardAPI) {
							return boardAPI.getBoardsForUser(sessionStorage.userId);
						}]
					}
				},
				"footer-view@": {
					templateUrl: "common/footer/footer.html"
				}
			},
			url: "/user/:username",
		});
	}]);


	module.controller("boardListCtrl", ["$scope", "$modal", "$state", "$log", "user", "boards", "boardAPI",
		function($scope, $modal, $state, $log, user, boards, boardAPI) {
			$scope.user = user;
			$scope.boardName = "";
			$scope.boards = boards;

			$scope.createBoard = function() {
				boardAPI
					.createBoard($scope.user._id, $scope.boardName)
					.then(function(res) {
						$scope.boards.push(res);
					}, function(err) {
						$log.error(err);
					});
			};

			$scope.openBoardModal = function(board) {
				$modal.open({
					animation: true,
					templateUrl: "board-list/board-modal/board-modal.html",
					controller: "boardModalCtrl",
					scope: $scope,
					resolve: {
						board: function() {
							return board;
						}
					}
				});
			};

			$scope.goToBoard = function(board) {
				sessionStorage.boardId = board._id;
				$state.go("kanban.board", {
					boardName: board.name
				});
			};
		}
	]);
})();
