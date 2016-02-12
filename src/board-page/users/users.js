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
		"$scope", "$modal", "boardFactory", "UserSortOpts", "$filter",
		function($scope, $modal, boardFactory, UserSortOpts, $filter) {

			$scope.addMember = function() {
				boardFactory.addMemberToBoard($scope.addMemberInput);
				$scope.clearAddMemberInput();
			};

			$scope.clearAddMemberInput = function() {
				$scope.addMemberInput = "";
			};

			$scope.openUserModal = function(user) {
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
				$scope.addMemberInput = value;
			};


			$scope.stopSort = function() {
				$scope.users = boardFactory.getBoardUsersSync();
			};


			$scope.board = boardFactory.getBoardSync();
			$scope.users = boardFactory.getBoardUsersSync();
			$scope.boardName = $filter("capitalize")($scope.board.name);
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
