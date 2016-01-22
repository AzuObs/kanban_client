(function() {
	"use strict";

	var module = angular.module("boardModalModule", [
		"boardAPIModule", "userAPIModule", "ui.bootstrap", "editableTextDirectiveModule"
	]);

	module.controller("boardModalCtrl", [
		"$log", "boardAPI", "userAPI", "$scope", "$modalInstance", "board",
		function($log, boardAPI, userAPI, $scope, $modalInstance, board) {
			$scope.board = board;
			$scope.isEditingTitle = false;
			$scope.isDeletingBoard = false;

			$scope.updateTitle = function() {
				boardAPI.updateBoard($scope.board);
			};

			$scope.toggleIsEditingTitle = function() {
				$scope.isEditingTitle = !$scope.isEditingTitle;
			};

			$scope.cancelEditing = function(e) {
				if (!e) {
					return $log.error("no event passed to cancel editing");
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
						userAPI
							.deleteBoard($scope.board._id)
							.then(function(res) {
								$modalInstance.dismiss();
							});
					} else {
						$log.error("board name does not match input");
					}
				}
			};

			$scope.closeModal = function() {
				$modalInstance.dismiss();
			};
		}
	]);
})();
