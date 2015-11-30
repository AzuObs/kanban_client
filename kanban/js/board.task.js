(function() {
	"use strict";

	var module = angular.module("kanbanTaskModule", []);


	module.directive("uiTask", function() {
		return {
			restrict: "E",
			replace: true,
			templateUrl: "kanban/html/board.task.directive.html"
		};
	});


	module.controller("kanbanTaskCtrl", ["$scope", "APIService", "$modal", function($scope, APIService, $modal) {
		// this.$scope child of category.$scope

		$scope.taskSortOptions = {
			placeholder: ".task",
			connectWith: ".task-list",
			stop: function(e, ui) {
				$scope.updateBoard();
			}
		};


		$scope.taskModal = function(_user, _board, _cat, _task) {
			var modalInstance = $modal.open({
				animation: true,
				size: "md",
				templateUrl: 'kanban/html/board.comments.modal.html',
				controller: 'kanbanCommentsModalController',
				resolve: {
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
	}]);


	module.controller("kanbanCommentsModalController", ["$scope", "$modalInstance", "$log", "APIService", "board", "cat", "task",
		function($scope, $modalInstance, $log, APIService, board, cat, task) {
			$scope.task = task;
			$scope.category = cat;

			$scope.closeModal = function() {
				$modalInstance.dismiss();
			};


			$scope.createComment = function(keyEvent) {
				if (!keyEvent || keyEvent.which === 13) {
					var params = {
						content: $scope.commentInput,
						userId: user._id,
						catId: cat._id,
						boardId: board._id,
						taskId: $scope.task._id
					};

					APIService
						.createComment(params)
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
