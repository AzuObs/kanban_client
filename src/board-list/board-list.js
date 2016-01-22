(function() {
	"use strict";

	var module = angular.module("boardListModule", [
		"userAPIModule",
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
						boards: ["userAPI", function(userAPI) {
							return userAPI.getUserBoards(sessionStorage.userId);
						}],
						user: ["userAPI", function(userAPI) {
							return userAPI.getUser(sessionStorage.userId);
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

	module.controller("boardListCtrl", [
		"$scope", "userAPI", "$modal", "$state", "$log", "boards", "user",
		function($scope, userAPI, $modal, $state, $log, boards, user) {
			$scope.boardName = "";
			$scope.user = user;
			$scope.boards = boards;

			$scope.createBoard = function() {
				userAPI.createBoard($scope.boardName);
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
