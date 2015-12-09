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
					templateUrl: "kanban/html/list-board.modal.html",
					controller: "editBoardModalCtrl",
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


	module.controller("editBoardModalCtrl", ["$log", "APIService", "$scope", "$modalInstance", "board",
		function($log, APIService, $scope, $modalInstance, board) {
			$scope.board = board;
			$scope.repeatBoardName = "";
			$scope.isDeletingBoard = false;

			$scope.deleteBoard = function(e) {
				if (!e) {
					return $log.log("no event passed to deleteBoard");
				}

				if (e.type === "click" && !angular.element(e.target).hasClass("delete-board")) {
					$scope.isDeletingBoard = !$scope.isDeletingBoard;
					angular.element("delete-board").focus();
					$scope.repeatBoardName = "";
				}

				if (e.type === "keypress" && e.which === 13) {
					if ($scope.repeatBoardName === $scope.board.name) {
						APIService
							.deleteBoard($scope.board._id)
							.then(function(res) {
								for (var i = 0; i < $scope.boards.length; i++) {
									if ($scope.boards[i]._id === $scope.board._id) {
										$scope.boards.splice(i, 1);
									}
								}
								$modalInstance.dismiss();
							}, function(err) {
								$log.log(err);
							});
					} else {
						$log.log("board name does not match input");
					}
				}
			};

			$scope.renameBoard = function(newname) {

			};


			$scope.closeModal = function() {
				$modalInstance.dismiss();
			};
		}
	]);

})();
