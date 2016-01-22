(function() {
	"use strict";

	var module = angular.module("taskModule", [
		"boardFactoryModule", "userFactoryModule", "ui.bootstrap", "ui.sortable", "taskDirectiveModule", "taskModalModule"
	]);

	module.controller("taskCtrl", ["$scope", "userFactory", "boardFactory", "$modal", "$log",
		function($scope, userFactory, boardFactory, $modal, $log) {
			$scope.taskName = "";

			$scope.taskSortOpts = {
				appendTo: "body",
				cursor: "move",
				connectWith: ".task-list",
				helper: "clone",
				horizontal: false,
				opacity: 0.4,
				tolerance: "pointer",
				stop: function(e, ui) {
					boardFactory.updateBoard();
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
						},
						user: ["userFactory", function(userFactory) {
							return userFactory.getUser(sessionStorage.userId);
						}]
					}
				});
			};

			$scope.createTask = function(category, keyEvent) {
				if (!keyEvent || keyEvent.type != "keypress" || !category) {
					return $log.error("invalid input @createTask");
				}

				if (keyEvent.which === 13) {
					boardFactory
						.createTask($scope.taskName, category)
						.then(function() {
							$scope.resetTaskName();
						});
				}
			};

			$scope.resetTaskName = function() {
				$scope.taskName = "";
			};
		}
	]);
})();
