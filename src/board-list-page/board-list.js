(function() {
	"use strict";

	var module = angular.module("boardListModule", [
		"boardFactoryModule",
		"boardModule",
		"boardModalModule",
		"navbarModule",
		"ui.bootstrap",
		"ui.router",
		"userFactoryModule",
		"capitalizeFilterModule"
	]);

	module.config(["$stateProvider", function($stateProvider) {
		$stateProvider.state("kanban.boardList", {
			views: {
				"navbar-view@": {
					templateUrl: "common/views/navbar/navbar.html",
					controller: "navbarCtrl"
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
		"$scope", "userFactory", "$modal", "$state", "boards", "user",
		function($scope, userFactory, $modal, $state, boards, user) {

			$scope.createBoard = function() {
				userFactory.createBoard($scope.newBoardName);
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

			$scope.newBoardName = "";
			$scope.user = user;
			$scope.boards = boards;
		}
	]);
})();
