(function() {
	"use strict";

	var module = angular.module("boardListModule", [
		"userFactoryModule",
		"boardFactoryModule",
		"navbarModule",
		"stateInfoModule",
		"ui.bootstrap",
		"ui.router"
	]);

	module.config(["$stateProvider", function($stateProvider) {
		$stateProvider.state("kanban.boardList", {
			views: {
				"navbar-view@": {
					templateUrl: "common/views/navbar/navbar.html",
					controller: "navbarCtrl"
				},
				"state-info-view@": {
					templateUrl: "common/views/state-info/state-info.html",
					controller: "stateInfoCtrl"
				},
				"body-view@": {
					templateUrl: "board-list-page/board-list.html",
					controller: "boardListCtrl",
					resolve: {
						boards: ["userFactory", function(userFactory) {
							return userFactory.getUserBoards(sessionStorage.userId);
						}],
						user: ["userFactory", function(userFactory) {
							return userFactory.getUser(sessionStorage.userId);
						}]
					}
				},
				"footer-view@": {
					templateUrl: "common/views/footer/footer.html"
				}
			},
			url: "/user/:username",
		});
	}]);

	module.controller("boardListCtrl", [
		"$scope", "userFactory", "$modal", "$state", "$log", "boards", "user",
		function($scope, userFactory, $modal, $state, $log, boards, user) {
			$scope.boardName = "";
			$scope.user = user;
			$scope.boards = boards;

			$scope.createBoard = function() {
				userFactory.createBoard($scope.boardName);
			};

			$scope.openBoardModal = function(board) {
				$modal.open({
					animation: true,
					templateUrl: "board-list-page/board-modal/board-modal.html",
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
