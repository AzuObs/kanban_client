(function() {
	"use strict";

	var module = angular.module("boardModalModule", [
		"boardFactoryModule",
		"userFactoryModule",
		"ui.bootstrap",
		"editableTextDirectiveModule",
		"deletableObjectDirectiveModule"
	]);

	module.controller("boardModalCtrl", [
		"$log", "boardFactory", "userFactory", "$scope", "$modalInstance", "board",
		function($log, boardFactory, userFactory, $scope, $modalInstance, board) {
			$scope.updateTitle = function() {
				boardFactory.updateBoard($scope.board);
			};

			$scope.toggleIsEditingTitle = function() {
				$scope.isEditingTitle = !$scope.isEditingTitle;
			};


			$scope.deleteBoard = function(e) {
				userFactory
					.deleteBoard($scope.board._id)
					.then(function(res) {
						$scope.closeModal();
					});
			};

			$scope.closeModal = function() {
				$modalInstance.dismiss();
			};

			$scope.board = board;
			$scope.isEditingTitle = false;
		}
	]);
})();
