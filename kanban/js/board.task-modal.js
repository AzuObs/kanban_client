(function() {
	"use strict";

	var module = angular.module("kanbanTaskModalModule", []);


	module.controller("kanbanTaskModalCtrl", ["$scope", "$modalInstance", "$log", "APIService", "user", "board", "cat", "task",
		function($scope, $modalInstance, $log, APIService, user, board, cat, task) {
			$scope.task = task;
			$scope.category = cat;


			$scope.closeModal = function() {
				$modalInstance.dismiss();
			};


			$scope.createComment = function(keyEvent) {
				if (!keyEvent || keyEvent.which === 13) {

					APIService
						.createComment($scope.commentInput, user._id, cat._id, board._id, $scope.task._id)
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
