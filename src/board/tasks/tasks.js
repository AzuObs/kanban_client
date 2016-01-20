(function() {
	"use strict";

	var module = angular.module("taskModule", [
		"boardAPIModule", "ui.bootstrap", "ui.sortable", "taskDirectiveModule", "taskModalModule"
	]);

	module.controller("taskCtrl", ["$scope", "boardAPI", "$modal", "$log",
		function($scope, boardAPI, $modal, $log) {
			$scope.taskName = "";

			$scope.taskSortOpts = {
				horizontal: false,
				tolerance: "pointer",
				cursor: "move",
				opacity: 0.4,
				connectWith: ".task-list",
				stop: function(e, ui) {
					boardAPI.updateBoard();
				}
			};

			$scope.openTaskModal = function(e, _board, _cat, _task) {
				if (!e || e.type != "click") {
					return $log.error("invalid input @openTaskModal");
				}

				if (angular.element(e.target).hasClass("glyphicon-remove")) {
					return;
				}

				$modal.open({
					animation: true,
					scope: $scope,
					size: "lg",
					templateUrl: "board/tasks/task-modal/task-modal.html",
					controller: "taskModalCtrl",
					resolve: {
						catId: function() {
							return _cat._id;
						},
						taskId: function() {
							return _task._id;
						}
					}
				});
			};

			$scope.createTask = function(category, keyEvent) {
				if (!keyEvent || keyEvent.type != "keypress" || !category) {
					return $log.error("invalid input @createTask");
				}

				if (keyEvent.which === 13) {
					boardAPI.createTask($scope.taskName, category);
					$scope.resetTaskName();
				}
			};

			$scope.resetTaskName = function() {
				$scope.taskName = "";
			};
		}
	]);
})();
