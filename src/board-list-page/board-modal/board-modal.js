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
		"boardFactory", "userFactory", "$scope", "$modalInstance", "board",
		function(boardFactory, userFactory, $scope, $modalInstance, board) {
			$scope.updateTitle = function() {
				boardFactory.updateBoard($scope.board);
			};

			$scope.toggleIsEditingTitle = function() {
				$scope.isEditingTitle = !$scope.isEditingTitle;
			};

			$scope.closeModal = function() {
				$modalInstance.dismiss();
			};

			$scope.deleteBoard = function() {
				userFactory
					.deleteBoard($scope.board._id)
					.then(function() {
						$scope.closeModal();
					});
			};

			$scope.board = board;
			$scope.isEditingTitle = false;
		}
	]);
})();
