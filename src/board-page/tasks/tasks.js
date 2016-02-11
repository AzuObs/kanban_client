(function() {
	"use strict";

	var module = angular.module("taskModule", [
		"boardFactoryModule",
		"ui.bootstrap",
		"ui.sortable",
		"taskDirectiveModule",
		"taskModalModule",
		"TaskSortOptsModule",
		"userFactoryModule"
	]);

	module.controller("taskCtrl", [
		"$scope", "userFactory", "boardFactory", "$modal", "TaskSortOpts",
		function($scope, userFactory, boardFactory, $modal, TaskSortOpts) {

			$scope.openTaskModal = function(e, _board, _cat, _task) {
				if (e && angular.element(e.target).hasClass("glyphicon-remove")) {
					return;
				}

				$modal.open({
					animation: true,
					scope: $scope,
					size: "lg",
					templateUrl: "board-page/tasks/task-modal/task-modal.html",
					controller: "taskModalCtrl",
					resolve: {
						catId: function() {
							return _cat._id;
						},
						taskId: function() {
							return _task._id;
						},
						user: ["userFactory", function(userFactory) {
							return userFactory.getUser(sessionStorage.userId);
						}]
					}
				});
			};


			$scope.createTask = function(category) {
				boardFactory
					.createTask(category, $scope.taskName)
					.then(function() {
						$scope.resetTaskName();
					});
			};


			$scope.resetTaskName = function() {
				$scope.taskName = "";
			};


			$scope.taskName = "";
			$scope.taskSortOpts = new TaskSortOpts();
		}
	]);
})();
