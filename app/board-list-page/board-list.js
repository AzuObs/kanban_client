(function() {
	"use strict";

	var module = angular.module("boardListModule", ["boardAPIModule"]);


	module.config(["$stateProvider", function($stateProvider) {
		$stateProvider.state("kanban.boardList", {
			views: {
				"navbar@": {
					templateUrl: "app/common/navbar/navbar.html"
				},
				"state-info@": {
					templateUrl: "app/common/state-info/state-info.html",
					controller: "stateInfoCtrl"
				},
				"body@": {
					templateUrl: "app/board-list-page/board-list.html",
					controller: "boardListCtrl",
					resolve: {
						user: ["boardAPI", function(boardAPI) {
							return boardAPI.getUser(sessionStorage.userId);
						}],
						boards: ["boardAPI", function(boardAPI) {
							return boardAPI.getBoardsForUser(sessionStorage.userId);
						}]
					}
				}
			},
			url: "/user/:username",
		});
	}]);


	module.controller("boardListCtrl", ["$scope", "$modal", "$state", "$log", "user", "boards", "boardAPI",
		function($scope, $modal, $state, $log, user, boards, boardAPI) {
			$scope.user = user;
			$scope.boards = boards;

			$scope.createBoard = function() {
				boardAPI
					.createBoard($scope.user._id, $scope.boardName)
					.then(function(res) {
						$scope.boards.push(res);
					}, function(err) {
						$log.log(err);
					});
			};

			$scope.openBoardModal = function(board) {
				$modal.open({
					animation: true,
					size: "md",
					templateUrl: "app/board-list-page/board-modal/board-modal.html",
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
