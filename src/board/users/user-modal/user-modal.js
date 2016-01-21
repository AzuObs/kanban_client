(function() {
	"use strict";

	var module = angular.module("userModalModule", [
		"boardAPIModule", "ui.bootstrap", "ui.router", "userDirectiveModule"
	]);

	module.controller("userModalCtrl", [
		"$state", "$log", "$scope", "$modalInstance", "boardAPI", "user",
		function($state, $log, $scope, $modalInstance, boardAPI, user) {
			$scope.modalUser = user;
			$scope.boardUsers = boardAPI.getBoardUsersFromMemory();
			$scope.isEditingRBAC = false;
			$scope.isDeleting = false;
			$scope.repeatUsername = "";
			$scope.userRBAC = undefined; // initialized at the bottom of this block
			$scope.userIsAdmin = false; // initialized at the bottom of this block

			$scope.cancelEditing = function(e) {
				if (!e) {
					return $log.error("no event passed to userModalCtrl.cancelEditing");
				}

				if (!angular.element(e.target)
					.hasClass("change-rbac")) {
					$scope.isEditingRBAC = false;
					$scope.userRBAC = $scope.getUserRBAC();
				}

				if (!angular.element(e.target)
					.hasClass("remove-user")) {
					$scope.isDeleting = false;
					$scope.repeatUsername = "";
				}
			};

			$scope.changeUserRBAC = function(e) {
				if (!e) {
					return $log.error("no event received @changeUserRBAC @userModalCtrl");
				}
				$scope.isEditingRBAC = !$scope.isEditingRBAC;
			};

			$scope.removeUser = function(e) {
				if (!e) {
					return $log.error("no $event received @removeUser");
				}

				if (e.type === "click") {
					$scope.isDeleting = !$scope.isDeleting;
					$scope.repeatUsername = "";

					setTimeout(function() {
						angular.element("input.remove-user")
							.focus();
					}, 0);
				}

				if (e.type === "keypress" && e.which === 13) {
					if ($scope.repeatUsername === $scope.modalUser.username) {
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
							boardAPI.updateBoard();
							$scope.closeModal();
						} else {
							// no users left
							boardAPI
								.deleteBoard($scope.board._id)
								.then(function() {
									$state.go("kanban.boardList", {
										username: $scope.user.username
									});
								}, function(err) {
									$log.error(err);
									$log.error("could not delete last user and/or board");
								});
						}

					} else {
						$scope.isDeleting = false;
						$log.error("username incorrect");
					}
				}
			};

			$scope.closeModal = function() {
				$modalInstance.dismiss();
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

				$log.error("user does not have RBAC");
			};

			$scope.$watch("userRBAC", function(newVal, oldVal) {
				$scope.userIsAdmin = newVal === "admin";
			});
			$scope.userRBAC = $scope.getUserRBAC();
		}
	]);

})();
