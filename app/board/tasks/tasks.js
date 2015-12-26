(function() {
	"use strict";

	var module = angular.module("taskModule", ["boardAPIModule", "ui.bootstrap", "ui.sortable", "taskDirectiveModule", "taskModalModule"]);


	module.controller("taskCtrl", ["$scope", "boardAPI", "$modal", "$log", function($scope, boardAPI, $modal, $log) {
		$scope.taskName = "";

		$scope.taskSortOpts = {
			horizontal: false,
			tolerance: "pointer",
			cursor: "move",
			opacity: 0.4,
			connectWith: ".task-list",
			stop: function(e, ui) {
				$scope.updateBoard();
			}
		};

		$scope.openTaskModal = function(e, _board, _cat, _task) {
			if (!e || e.type != "click" || angular.element(e.target).hasClass("glyphicon-remove")) {
				return $log.error("invalid input @openTaskModal");
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

		$scope.createTask = function(name, category, keyEvent) {
			if (!keyEvent || keyEvent.type != "keypress" || !name || !category) {
				return $log.error("invalid input @createTask");
			}

			if (keyEvent.which === 13) {
				$scope.resetTaskName();

				boardAPI
					.createTask($scope.board._id, category._id, name, category.tasks.length)
					.then(function(res) {
						$scope.addTask(category, res);
					}, function(err) {
						$log.error(err);
					});
			}
		};

		$scope.resetTaskName = function() {
			$scope.taskName = "";
		};

		$scope.addTask = function(category, task) {
			if (!category || !task) {
				return $log.error("invalid input @addTask");
			}

			category.tasks.push(task);
		};
	}]);
})();
