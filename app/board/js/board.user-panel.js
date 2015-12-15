(function() {
	"use strict";

	var module = angular.module("kanbanUserPanelModule", []);

	module.controller("kanbanUserPanelCtrl", ["$scope", "$modal", "$log", "APIService", function($scope, $modal, $log, APIService) {
		$scope.membersSuggestions = [{
			email: "sheldon@mail.com"
		}, {
			email: "raj@mail.com"
		}, {
			email: "penny@mail.com"
		}, {
			email: "leonard@mail.com"
		}, {
			email: "wolowitz@mail.com"
		}];


		$scope.setAddMember = function(value) {
			$scope.addMemberInput = value;
		};

		$scope.addMemberFn = function(keyEvent) {
			if (!keyEvent || keyEvent.which === 13) {

				//check member isnt already in the users
				for (var i = 0; i < $scope.users.length; i++) {
					if ($scope.addMemberInput === $scope.users[i].email) {
						return $log.log("avoiding duplicate: user already exists");
					}
				}

				APIService.addMemberToBoard($scope.board, $scope.addMemberInput)
					.then(function(res) {
						$scope.board.members.push(res);
						$scope.users.push(res);
					}, function(err) {
						$log.log(err);
					});
			}
		};

		$scope.editUser = function(user) {
			openEditUser($scope.board, user);
		};

		var openEditUser = function(board, user) {
			$modal.open({
				animation: true,
				size: "md",
				templateUrl: "app/board/html/board.user.modal.html",
				controller: "editUserModalCtrl",
				scope: $scope,
				resolve: {
					user: function() {
						return user;
					}
				}
			});
		};
	}]);


	module.controller("editUserModalCtrl", ["$state", "$log", "$scope", "$modalInstance", "APIService", "user",
		function($state, $log, $scope, $modalInstance, APIService, user) {
			$scope.modalUser = user;
			$scope.isEditingRBAC = false;
			$scope.isDeleting = false;
			$scope.repeatUsername = "";
			$scope.userRBAC = getUserRBAC($scope);


			$scope.cancelEditing = function(e) {
				if (!angular.element(e.target).hasClass("change-rbac")) {
					$scope.isEditingRBAC = false;
					$scope.userRBAC = getUserRBAC($scope);
				}

				if (!angular.element(e.target).hasClass("remove-user")) {
					$scope.isDeleting = false;
					$scope.repeatUsername = "";
				}
			};


			$scope.changeUserRBAC = function(e) {
				$scope.isEditingRBAC = !$scope.isEditingRBAC;
			};


			$scope.removeUser = function(e) {
				if (e.type === "click") {
					$scope.isDeleting = !$scope.isDeleting;
					$scope.repeatUsername = "";

					setTimeout(function() {
						angular.element("input.remove-user").focus();
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
							APIService
								.updateBoard($scope.board)
								.then(function(res) {
									$scope.board._v++;
									$modalInstance.close();
								}, function(err) {
									$log.log(err);
								});
						} else {
							// no users left
							APIService
								.deleteBoard($scope.board._id)
								.then(function() {
									$state.go("kanban.boardList", {
										username: $scope.user.username
									});
								}, function(err) {
									$log.log("could not delete last user and board");
								});
						}

					} else {
						$scope.isDeleting = false;
						$log.log("username incorrect");
					}
				}
			};


			$scope.closeModal = function() {
				$modalInstance.dismiss();
			};
		}
	]);


	var getUserRBAC = function($scope) {
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

		$log.log("user does not have RBAC");
		throw "user does not have RBAC";
	};

})();
