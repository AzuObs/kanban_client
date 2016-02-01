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
		"$state", "$log", "$scope", "$modalInstance", "boardFactory", "user",
		function($state, $log, $scope, $modalInstance, boardFactory, user) {

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
				for (var i = 0; i < $scope.board.admins.length; i++) {
					if ($scope.board.admins[i]._id === $scope.modalUser._id) {
						$scope.board.admins.splice(i, 1);
						break;
					}
				}

				for (i = 0; i < $scope.board.members.length; i++) {
					if ($scope.board.members[i]._id === $scope.modalUser._id) {
						$scope.board.members.splice(i, 1);
						break;
					}
				}

				for (i = 0; i < $scope.users.length; i++) {
					if ($scope.users[i]._id === $scope.modalUser._id) {
						$scope.users.splice(i, 1);
						break;
					}
				}

				// from tasks
				for (i = 0; i < $scope.board.categories.length; i++) {
					var category = $scope.board.categories[i];

					for (var j = 0; j < category.tasks.length; j++) {
						var task = category.tasks[j];

						for (var k = 0; k < task.users.length; k++) {
							var user = task.users[k];

							if (user._id === $scope.modalUser._id) {
								task.users.splice(k, 1);
								break;
							}
						}
					}
				}

				if ($scope.users.length) {
					boardFactory.updateBoard();
					$scope.closeModal();
				} else {
					// no users left
					boardFactory
						.deleteBoard($scope.board._id)
						.then(function() {
							$state.go("kanban.boardList", {
								username: $scope.user.username
							});
						}, function(err) {
							$log.error("could not delete last user and/or board");
						});
				}
			};


			$scope.getUserRBAC = function() {
				var user = $scope.modalUser;

				for (var i = 0; i < $scope.board.members.length; i++) {
					if ($scope.board.members[i]._id === user._id) {
						return "member";
					}
				}

				for (i = 0; i < $scope.board.admins.length; i++) {
					if ($scope.board.admins[i]._id === user._id) {
						return "admin";
					}
				}
			};


			$scope.closeModal = function() {
				$modalInstance.dismiss();
			};


			$scope.modalUser = user;
			$scope.boardUsers = boardFactory.getBoardUsersSync();
			$scope.isEditingRBAC = false;
			$scope.userRBAC = $scope.getUserRBAC();
			$scope.userIsAdmin = ($scope.userRBAC === "admin");
		}
	]);

})();
