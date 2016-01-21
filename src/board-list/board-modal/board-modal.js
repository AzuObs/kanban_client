(function() {
	"use strict";

	var module = angular.module("boardModalModule", ["boardAPIModule", "ui.bootstrap"]);

	module.controller("boardModalCtrl", [
		"$log", "boardAPI", "$scope", "$modalInstance", "board",
		function($log, boardAPI, $scope, $modalInstance, board) {
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
						boardAPI
							.deleteBoard($scope.board._id)
							.then(function(res) {
								$modalInstance.dismiss();
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
					boardAPI
						.updateBoard($scope.board)
						.then(function() {
							$scope.isEditingName = false;
						});
				}
			};

			$scope.closeModal = function() {
				$modalInstance.dismiss();
			};
		}
	]);
})();
