(function() {
	"use strict";

	var module = angular.module("kanbanTaskModule", []);


	module.directive("kbTask", function() {
		return {
			restrict: "E",
			replace: true,
			templateUrl: "kanban/html/board.task.directive.html"
		};
	});


	module.controller("kanbanTaskCtrl", ["$scope", "APIService", "$modal", function($scope, APIService, $modal) {
		// this.$scope child of category.$scope
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

		$scope.openTaskModal = function(_board, _cat, _task) {
			var modalInstance = $modal.open({
				animation: true,
				size: "md",
				templateUrl: 'kanban/html/board.task.modal.html',
				controller: 'kanbanTaskModalCtrl',
				resolve: {
					user: function() {
						return $scope.user;
					},
					board: function() {
						return _board;
					},
					cat: function() {
						return _cat;
					},
					task: function() {
						return _task;
					}
				}
			});
		};


		$scope.deleteTask = function(category, taskId) {
			APIService
				.deleteTask($scope.board._id, category._id, taskId)
				.then(function(res) {
					for (var i = 0; i < category.tasks.length; i++) {
						if (category.tasks[i]._id === taskId) {
							category.tasks.splice(i, 1);
						}
					}
				}, function(err) {
					$log.log(err);
				});
		};

		$scope.createTask = function(name, category, keyEvent) {
			if (!keyEvent || keyEvent.which === 13) {
				$scope.taskName = "";

				APIService
					.createTask($scope.board._id, category._id, name, category.tasks.length)
					.then(function(res) {
						category.tasks.push(res);
					}, function(err) {
						$log.log(err);
					});
			}
		};

	}]);
})();