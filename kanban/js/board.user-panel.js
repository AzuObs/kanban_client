(function() {
	"use strict";

	var module = angular.module("kanbanUserPanelModule", []);

	module.controller("kanbanUserPanelCtrl", ["$scope", "$modal", "APIService", function($scope, $modal, APIService) {
		//this.$scope is child of kanban.board.$scope

		$scope.setAddMember = function(value) {
			$scope.addMemberInput = value;
		};

		$scope.addMemberFn = function(keyEvent) {
			if (!keyEvent || keyEvent.which === 13) {
				APIService.addMemberToBoard($scope.board, $scope.addMemberInput)
					.then(function(res) {
						$scope.board = res;
						$scope.users = $scope.board.admins.concat($scope.board.members);
					}, function(err) {
						console.log(err);
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
				templateUrl: "kanban/html/modal.board-user-edit.html",
				controller: "editUserCtrl",
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


	module.controller("editUserCtrl", ["$scope", "$modalInstance", "APIService", "user", "board",
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
						console.log(err);
					});
			};

			$scope.closeModal = function() {
				$modalInstance.dismiss();
			};
		}
	]);

})();
