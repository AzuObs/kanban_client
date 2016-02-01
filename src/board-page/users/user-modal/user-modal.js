(function() {
	"use strict";

	var module = angular.module("userModalModule", [
		"boardFactoryModule",
		"ui.bootstrap",
		"ui.router",
		"userDirectiveModule",
		"deletableObjectDirectiveModule"
	]);

	module.controller("userModalCtrl", [
		"$log", "$scope", "$modalInstance", "boardFactory", "user",
		function($log, $scope, $modalInstance, boardFactory, user) {

			$scope.cancelEditing = function(e) {
				if (!angular.element(e.target).hasClass("change-rbac")) {
					$scope.isEditingRBAC = false;
					$scope.userRBAC = $scope.getUserRBAC();
				}
			};


			$scope.changeUserRBAC = function(e) {
				$scope.isEditingRBAC = !$scope.isEditingRBAC;
			};


			$scope.removeUser = function() {
				boardFactory
					.removeUserFromBoard($scope.modalUser)
					.then(function() {
						$scope.closeModal();
					});
			};


			$scope.getUserRBAC = function() {
				for (var i = 0; i < $scope.board.members.length; i++) {
					if ($scope.board.members[i]._id === $scope.modalUser._id) {
						return "member";
					}
				}

				for (i = 0; i < $scope.board.admins.length; i++) {
					if ($scope.board.admins[i]._id === $scope.modalUser._id) {
						return "admin";
					}
				}

				$log.error("user does not have RBAC");
				return null;
			};


			$scope.closeModal = function() {
				$modalInstance.dismiss();
			};


			$scope.modalUser = user;
			$scope.isEditingRBAC = false;
			$scope.userRBAC = $scope.getUserRBAC();
			$scope.userIsAdmin = ($scope.userRBAC === "admin");
			$scope.boardUsers = boardFactory.getBoardUsersSync();
		}
	]);

})();
