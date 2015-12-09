(function() {
	"use strict";

	var module = angular.module("kanbanUserPanelModule", []);

	module.controller("kanbanUserPanelCtrl", ["$scope", "$modal", "$log", "APIService", function($scope, $modal, $log, APIService) {
		//this.$scope is child of kanban.board.$scope
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
				templateUrl: "kanban/html/board.user.modal.html",
				controller: "editUserModalCtrl",
				resolve: {
					user: function() {
						return user;
					},
					board: function() {
						return board;
					}
				}
			});
		};
	}]);


	module.controller("editUserModalCtrl", ["$scope", "$modalInstance", "APIService", "user", "board",
		function($scope, $modalInstance, APIService, user, board) {
			$scope.user = user;
			$scope.board = board;

			$scope.options = [{
				name: "change role",
				type: "text"
			}, {
				name: "change position in list",
				type: "text"
			}];

			$scope.removeUserFromBoard = function() {
				APIService.removeUserFromBoard($scope.board, $scope.user)
					.then(function(res) {
						var iMember = $scope.board.members.indexOf($scope.user._id);
						if (iMember >= 0) {
							$scope.board.members.splice(iMember, 1);
						}

						var iAdmin = $scope.board.admins.indexOf($scope.user._id);
						if (iAdmin >= 0) {
							$scope.board.admins.splice(iAdmin, 1);
						}

					}, function(err) {
						$log.log(err);
					});
			};

			$scope.closeModal = function() {
				$modalInstance.dismiss();
			};
		}
	]);

})();
