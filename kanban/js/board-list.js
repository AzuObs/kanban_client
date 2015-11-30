(function() {
	"use strict";

	var module = angular.module("kanbanBoardListModule", ["APIServiceModule"]);


	module.config(["$stateProvider", function($stateProvider) {
		$stateProvider.state("kanban.boardList", {
			url: "/user/:username",
			templateUrl: "kanban/html/list-board.html",
			controller: "kanbanBoardListCtrl",
			resolve: {
				user: ["APIService", function(APIService) {
					return APIService.getUser(sessionStorage.userId);
				}],
				boards: ["APIService", function(APIService) {
					return APIService.getBoardsForUser(sessionStorage.userId);
				}]
			}
		});
	}]);


	module.controller("kanbanBoardListCtrl", ["$scope", "$modal", "$state", "$log", "user", "boards", "APIService",
		function($scope, $modal, $state, $log, user, boards, APIService) {
			$scope.user = user;
			$scope.boards = boards;

			$scope.createBoard = function() {
				APIService
					.createBoard({
						userId: $scope.user._id,
						name: $scope.boardName
					})
					.then(function(res) {
						$scope.boards.push(res);
					}, function(err) {
						$log.log(err);
					});
			};

			$scope.editBoard = function(_board) {
				openEditBoardModal($scope.user, _board);
			};

			$scope.deleteBoard = function(board) {
				APIService
					.deleteBoard(board._id)
					.then(function(res) {
						for (var i = 0; i < $scope.boards.length; i++) {
							if ($scope.boards[i]._id === board._id) {
								$scope.boards.splice(i, 1);
							}
						}
					}, function(err) {
						$log.log(err);
					});
			};

			$scope.goToBoard = function(board) {
				sessionStorage.boardId = board._id;
				$state.go("kanban.board", {
					boardName: board.name
				});
			};

			var openEditBoardModal = function(_user, _board) {
				$modal.open({
					animation: true,
					size: "md",
					templateUrl: "kanban/html/list-board.modal.html",
					controller: "editBoardModalCtrl",
					resolve: {
						user: function() {
							return _user;
						},
						board: function() {
							return _board;
						}
					}
				});
			};
		}
	]);


	module.controller("editBoardModalCtrl", ["$scope", "$modalInstance", "user", "board", function($scope, $modalInstance, user, board) {
		$scope.user = user;
		$scope.board = board;
		$scope.options = [{
			name: "change user",
			type: "text"
		}, {
			name: "change name",
			type: "text"
		}, {
			name: "change position in list",
			type: "text"
		}];

		$scope.closeModal = function() {
			$modalInstance.dismiss();
		};
	}]);

})();
