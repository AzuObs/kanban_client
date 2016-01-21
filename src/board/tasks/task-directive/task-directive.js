(function() {
	"use strict";

	var module = angular.module("taskDirectiveModule", [
		"boardAPIModule", "ui.bootstrap", "ui.sortable", "userDirectiveModule", "globalValuesModule"
	]);


	module.directive("kbTask", function() {
		var directiveDefinition = {
			scope: {
				task: "=ngModel"
			},
			restrict: "E",
			replace: true,
			templateUrl: "board/tasks/task-directive/task-directive.html",
			controller: "kbTaskCtrl",
			link: function(scope, elem, attr) {
				scope.$on("$destroy", function() {
					//cleanup
				});
			}
		};

		return directiveDefinition;
	});


	module.controller("kbTaskCtrl", [
		"boardAPI", "$scope", "$log",
		function(boardAPI, $scope, $log, USER_SELECTION_HEIGHT) {
			$scope.deleteTask = function(category, task) {
				boardAPI.deleteTask(category, task);
			};

			$scope.board = boardAPI.getBoardFromMemory();
			$scope.showUserList = false;
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
				beforeStop: function(e, ui) {
					$scope.showUserList = false;
				},
				stop: function(e, ui) {
					boardAPI.getBoardUsersFromMemory();
					boardAPI.updateBoard();
				}
			};
		}
	]);
})();
