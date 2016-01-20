(function() {
	"use strict";

	var module = angular.module("boardModalModule", ["serverAPIModule", "ui.bootstrap"]);

	module.controller("boardModalCtrl", ["$log", "serverAPI", "$scope", "$modalInstance", "board",
		function($log, serverAPI, $scope, $modalInstance, board) {
			$scope.board = board;
			$scope.repeatBoardName = "";
			$scope.isEditingName = false;
			$scope.isDeletingBoard = false;


			$scope.cancelEditing = function(e) {
				if (!e) {
					return $log.error("no event passed to cancel editing");
				}

				if ($scope.isEditingName) {
					if (!angular.element(e.target).hasClass("edit-board")) {
						$scope.isEditingName = false;
						e.type = "keypress";
						e.which = 13;
						$scope.renameBoard(e);
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
					return $log.error("no event passed to deleteBoard");
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
						serverAPI
							.deleteBoard($scope.board._id)
							.then(function(res) {
								for (var i = 0; i < $scope.boards.length; i++) {
									if ($scope.boards[i]._id === $scope.board._id) {
										$scope.boards.splice(i, 1);
									}
								}
								$modalInstance.dismiss();
							}, function(err) {
								$log.error(err);
							});
					} else {
						$log.error("board name does not match input");
					}
				}
			};

			$scope.renameBoard = function(e) {
				if (!e) {
					return $log.error("no event passed to renameBoard");
				}

				if (e.type === "click" && !$scope.isEditingName) {
					$scope.isEditingName = true;
					setTimeout(function() {
						angular.element(".board-name").focus();
					}, 0);
				}

				if (e.type === "keypress" & e.which === 13) {
					serverAPI
						.updateBoard($scope.board)
						.then(function() {
							board._v++;
							$scope.isEditingName = false;
						}, function(err) {
							$log.error(err);
						});
				}
			};

			$scope.closeModal = function() {
				$modalInstance.dismiss();
			};
		}
	]);
})();
