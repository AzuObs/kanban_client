(function() {
	"use strict";


	var module = angular.module("userMenuModule", [
		"globalValuesModule", "boardFactoryModule", "ui.bootstrap", "ui.sortable", "userDirectiveModule", "userModalModule"
	]);


	module.controller("userMenuCtrl", [
		"$scope", "$modal", "$log", "boardFactory", "USER_SELECTION_HEIGHT",
		function($scope, $modal, $log, boardFactory, USER_SELECTION_HEIGHT) {
			$scope.board = boardFactory.getBoardSync();
			$scope.users = boardFactory.getBoardUsersSync();

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

			$scope.editUser = function(user) {
				if (!user) {
					return $log.error("no arguments for userMenuCtrl.editUser()");
				}

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

			$scope.userSortOpts = {
				appendTo: "body",
				connectWith: ".user-list",
				cursor: "move",
				cursorAt: {
					left: 16,
					top: 16
				},
				helper: "clone",
				horizontal: true,
				scroll: false,
				tolerance: "pointer",
				activate: function(e, ui) {
					if (e.clientY < USER_SELECTION_HEIGHT) {
						$(ui.placeholder[0]).css("display", "none");
						$(ui.helper.prevObject[0]).css("display", "block");
					}
					$(ui.placeholder[0]).css("margin", "0px");
					$scope.showUserList = true;
				},
				change: function(e, ui) {
					if (e.clientY > USER_SELECTION_HEIGHT) {
						$(ui.placeholder[0]).css("display", "block");
					} else {
						$(ui.placeholder[0]).css("display", "none");
					}
				},
				update: function(e, ui) {
					// cancel duplicates
					for (var i = 0; i < ui.item.sortable.droptargetModel.length; i++) {
						if (ui.item.sortable.droptargetModel[i]._id === ui.item.sortable.model._id) {
							$log.error("duplicate already exists in that list of task users");
							ui.item.sortable.cancel();
						}
					}
				},
				stop: function(e, ui) {
					$scope.users = boardFactory.getBoardUsersSync();
					boardFactory.updateBoard();
				}
			};
		}
	]);
})();
