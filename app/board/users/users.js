(function() {
	"use strict";

	var module = angular.module("userMenuModule", ["boardAPIModule", "ui.bootstrap", "ui.sortable", "userDirectiveModule", "userModalModule"]);


	module.controller("userMenuCtrl", ["$scope", "$modal", "$log", "boardAPI", function($scope, $modal, $log, boardAPI) {
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

		$scope.editUser = function(user) {
			openEditUser($scope.board, user);
		};

		var openEditUser = function(board, user) {
			$modal.open({
				animation: true,
				templateUrl: "board/users/user-modal/user-modal.html",
				controller: "userModalCtrl",
				scope: $scope,
				resolve: {
					user: function() {
						return user;
					}
				}
			});
		};

		$scope.setAddMember = function(value) {
			$scope.addMemberInput = value;
		};

		$scope.addMemberFn = function(keyEvent) {
			if (!keyEvent || keyEvent.which === 13) {

				//check member isnt already in the users
				for (var i = 0; i < $scope.users.length; i++) {
					if ($scope.addMemberInput === $scope.users[i].email) {
						return $log.error("avoiding duplicate: user already exists");
					}
				}

				boardAPI.addMemberToBoard($scope.board, $scope.addMemberInput)
					.then(function(res) {
						$scope.board.members.push(res);
						$scope.users.push(res);
					}, function(err) {
						$log.error(err);
					});
			}
		};
	}]);


})();
