(function() {
	"use strict";

	var module = angular.module("taskModule", ["boardAPIModule", "ui.bootstrap", "ui.sortable", "taskDirectiveModule", "taskModalModule"]);


	module.controller("taskCtrl", ["$scope", "boardAPI", "$modal", "$log", function($scope, boardAPI, $modal, $log) {
		$scope.taskSortOptions = {
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
			if (angular.element(e.target).hasClass("glyphicon-remove")) {
				return;
			}

			var modalInstance = $modal.open({
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
			if (!keyEvent || keyEvent.which === 13) {
				$scope.taskName = "";

				boardAPI
					.createTask($scope.board._id, category._id, name, category.tasks.length)
					.then(function(res) {
						category.tasks.push(res);
					}, function(err) {
						$log.error(err);
					});
			}
		};

	}]);
})();
