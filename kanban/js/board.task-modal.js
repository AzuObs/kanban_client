(function() {
	"use strict";

	var module = angular.module("kanbanTaskModalModule", []);


	module.controller("kanbanTaskModalCtrl", ["$scope", "$modalInstance", "$log", "APIService", "catId", "taskId",
		function($scope, $modalInstance, $log, APIService, catId, taskId) {

			var iCat = $scope.board.categories.findIndex(function(element, i, array) {
				if (element._id === catId) return true;
			});

			var iTask = $scope.board.categories[iCat].tasks.findIndex(function(element, i, array) {
				if (element._id === taskId) return true;
			});

			$scope.category = $scope.board.categories[iCat];
			$scope.task = $scope.category.tasks[iTask];
			$scope.isEdittingTaskName = false;
			$scope.isDeletingTask = false;
			$scope.repeatTaskName = '';

			$scope.removeUserFromTask = function(user) {

			};

			$scope.moveTaskToCategory = function(category) {

			};

			$scope.addUserToTask = function(user) {

			};

			$scope.deleteTask = function(e) {

			};


			$scope.endAllEditting = function(e) {
				$scope.editTaskName(e);
			};

			$scope.editTaskName = function(e) {
				if (e.which === 13 || e.type === "click") {
					if (!$scope.isEdittingTaskName) {
						$scope.isEdittingTaskName = true;
					} else {
						$scope.isEdittingTaskName = false;
						APIService
							.updateTask($scope.board._id, $scope.category._id, $scope.task)
							.then(function(res) {
								$scope.board._v++;
							}, function(err) {
								$log.log(err);
							});
					}
				}
			};


			$scope.createComment = function(keyEvent) {
				if (!keyEvent || keyEvent.which === 13) {

					APIService
						.createComment($scope.commentInput, user._id, $scope.category._id, $scope.board._id, $scope.task._id)
						.then(function(res) {
							$scope.task.comments.push(res);
						}, function(err) {
							$log.log(err);
						});
				}
			};

			$scope.ageOfPost = function(t) {
				if (!t) return "no timestamp";

				t = Date.parse(t);
				var now = Date.now();
				var elapsedSeconds = Math.floor((now.valueOf() - t.valueOf()));


				var intervals = {
					year: 1000 * 3600 * 24 * 30 * 12,
					month: 1000 * 3600 * 24 * 30,
					day: 1000 * 3600 * 24,
					hour: 1000 * 3600,
					minute: 1000 * 60,
					second: 1000 * 1,
					milliseconds: 1
				};

				for (var timeUnit in intervals) {
					if (Math.floor(elapsedSeconds / intervals[timeUnit]) === 1) {
						if (timeUnit === "milliseconds") {
							return "just now";
						}
						return Math.floor(elapsedSeconds / intervals[timeUnit]) + " " + timeUnit + " ago";
					}
					if (Math.floor(elapsedSeconds / intervals[timeUnit])) {
						if (timeUnit === "milliseconds") {
							return "just now";
						}
						return Math.floor(elapsedSeconds / intervals[timeUnit]) + " " + timeUnit + "s ago";
					}
				}

				return "no valid timestamp";
			};
		}
	]);
})();
