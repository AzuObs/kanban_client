(function() {
	"use strict";


	var module = angular.module("userMenuModule", [
		"boardFactoryModule",
		"ui.bootstrap",
		"ui.sortable",
		"userDirectiveModule",
		"userModalModule",
		"UserSortOptsModule",
		"capitalizeFilterModule"
	]);


	module.controller("userMenuCtrl", [
		"$scope", "$modal", "$log", "boardFactory", "UserSortOpts", "$filter",
		function($scope, $modal, $log, boardFactory, UserSortOpts, $filter) {
			$scope.editUser = function(user) {
				if (!user) {
					return $log.error("no arguments for userMenuCtrl.editUser()");
				}

				$modal.open({
					animation: true,
					templateUrl: "board-page/users/user-modal/user-modal.html",
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
				if (!value) {
					return $log.error("no arguments userMenuCtrl.setAddMember()");
				}

				$scope.addMemberInput = value;
			};

			$scope.addMember = function(e) {
				if (e.type === "click" || (e.type === "keypress" && e.which === 13)) {
					for (var i = 0; i < $scope.users.length; i++) {
						if ($scope.addMemberInput === $scope.users[i].email) {
							return $log.error("avoiding duplicate: user already exists");
						}
					}

					boardFactory.addMemberToUserSelection($scope.addMemberInput);
				}
			};

			$scope.stopSort = function() {
				$scope.users = boardFactory.getBoardUsersSync();
			};

			$scope.boardName = $filter("capitalize")($scope.board.name);
			$scope.users = boardFactory.getBoardUsersSync();
			$scope.userSortOpts = new UserSortOpts($scope.stopSort);
			$scope.addMemberInput = "";
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
		}
	]);
})();
