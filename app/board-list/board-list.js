(function() {
	"use strict";

	var module = angular.module("kanbanBoardListModule", ["APIServiceModule"]);


	module.config(["$stateProvider", function($stateProvider) {
		$stateProvider.state("kanban.boardList", {
			views: {
				"header@": {
					templateUrl: "app/common/header/header.html"
				},
				"state-info@": {
					templateUrl: "app/common/state-info/state-info.html",
					controller: "stateInfoCtrl"
				},
				"body@": {
					templateUrl: "app/board-list/board-list.html",
					controller: "kanbanBoardListCtrl",
					resolve: {
						user: ["APIService", function(APIService) {
							return APIService.getUser(sessionStorage.userId);
						}],
						boards: ["APIService", function(APIService) {
							return APIService.getBoardsForUser(sessionStorage.userId);
						}]
					}
				}
			},
			url: "/user/:username",
		});
	}]);


	module.controller("kanbanBoardListCtrl", ["$scope", "$modal", "$state", "$log", "user", "boards", "APIService",
		function($scope, $modal, $state, $log, user, boards, APIService) {
			console.log("ping");

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
					templateUrl: "app/board-list/board-list-modal.html",
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
			$scope.isEditingName = false;
			$scope.isDeletingBoard = false;

			$scope.cancelEditing = function(e) {
				if (!e) {
					$log.log("no event passed to cancel editing");
				}

				if ($scope.isEditingName) {
					if (!angular.element(e.target).hasClass("edit-board")) {
						$scope.isEditingName = false;
					}
				}

				if ($scope.isDeletingBoard) {
					if (!angular.element(e.target).hasClass("delete-board")) {
						$scope.isDeletingBoard = false;
						$scope.repeatBoardName = "";
					}
				}
			};


			$scope.deleteBoard = function(e) {
				if (!e) {
					return $log.log("no event passed to deleteBoard");
				}

				if (e.type === "click" && !angular.element(e.target).hasClass("delete-board-input")) {
					$scope.isDeletingBoard = !$scope.isDeletingBoard;
					$scope.repeatBoardName = "";
					setTimeout(function() {
						angular.element(".delete-board-input").focus();
					}, 0);
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

			$scope.renameBoard = function(e) {
				if (!e) {
					return $log.log("no event passed to renameBoard");
				}

				if (e.type === "click" && !$scope.isEditingName) {
					$scope.isEditingName = true;
					setTimeout(function() {
						angular.element(".board-name").focus();
					}, 0);
				}

				if (e.type === "keypress" & e.which === 13) {
					APIService
						.updateBoard($scope.board)
						.then(function() {
							board._v++;
							$scope.isEditingName = false;
						}, function(err) {
							$log.log(err);
						});
				}
			};


			$scope.closeModal = function() {
				$modalInstance.dismiss();
			};
		}
	]);

})();
