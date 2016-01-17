(function() {
	"use strict";

	var module = angular.module("taskModalModule", ["boardAPIModule", "ui.bootstrap", "userDirectiveModule"]);


	module.controller("taskModalCtrl", ["$scope", "$modalInstance", "$log", "boardAPI", "catId", "taskId",
		function($scope, $modalInstance, $log, boardAPI, catId, taskId) {
			//variable initializations at the bottom of this block
			//

			$scope.removeUserFromLocalTask = function(user) {
				var i = -1;
				i = $scope.task.users.findIndex(function(e) {
					return e._id === user._id;
				});

				$scope.task.users.splice(i, 1);
			};

			$scope.removeUserFromTask = function(user) {
				$scope.removeUserFromLocalTask(user);

				boardAPI
					.updateBoard($scope.board)
					.then(function() {
						$scope.getAddableUsers();
						$scope.board._v++;
					}, function(err) {
						$log.error(err);
					});
			};

			$scope.moveTaskToCategoryLocally = function(destCat) {
				var srcTaskIdx, destCatIdx;
				srcTaskIdx = $scope.taskIndex;
				catId = destCat._id;

				//remove task from old category
				$scope.category.tasks.splice(srcTaskIdx, 1);

				//change category
				destCatIdx = $scope.getCatIndex($scope, catId);
				$scope.category = $scope.board.categories[destCatIdx];

				//add task to new category
				$scope.category.tasks.push($scope.task);

				//get new task index and changeable categories
				$scope.taskIndex = $scope.getTaskIndex($scope, taskId, $scope.categoryIndex);
				$scope.getChangeableCategories();
			};

			$scope.moveTaskToCategory = function(category) {
				$scope.moveTaskToCategoryLocally(category);

				boardAPI
					.updateBoard($scope.board)
					.then(function() {
						$scope.board._v++;
					}, function(err) {
						$log.error(err);
					});
			};

			$scope.addUserToTask = function(user) {
				$scope.task.users.push(user);

				boardAPI
					.updateBoard($scope.board)
					.then(function() {
						$scope.getAddableUsers();
						$scope.board._v++;
					}, function(err) {
						$log.error(err);
					});
			};


			$scope.closeModal = function() {
				$modalInstance.dismiss();
			};

			$scope.deleteTask = function(e) {
				if (e.type === "click" && !angular.element(e.target).hasClass("delete-task-button")) {
					$scope.isDeletingTask = !$scope.isDeletingTask;
					setTimeout(function() {
						angular.element("input.delete-task").focus();
					}, 0);
					return;
				}

				if ((e.type = "keypress" && e.which === 13) || angular.element(e.target).hasClass("delete-task-button")) {
					if ($scope.repeatTaskName === $scope.task.name) {
						$scope.category.tasks.splice($scope.taskIndex, 1);
						boardAPI
							.updateBoard($scope.board)
							.then(function() {
								$scope.board._v++;
								$scope.closeModal();
							}, function(err) {
								$log.error(err);
							});
					} else {
						$log.error("your input does not match the task's name @deleteTask");
					}
				}
			};

			$scope.stopDeletingTask = function() {
				$scope.isDeletingTask = false;
				$scope.repeatTaskName = "";
			};

			$scope.stopEditingTaskName = function(e) {
				$scope.editTaskName(e);
			};

			$scope.endAllEditing = function(e) {
				if (!e || (e.type != "click")) {
					$log.error("invalid input @endAllEditing");
				}

				if ($scope.isEditingTaskName && !angular.element(e.target).hasClass("task-name-edit")) {
					$scope.stopEditingTaskName(e);
				}

				if ($scope.isDeletingTask && !angular.element(e.target).hasClass("delete-task")) {
					$scope.stopDeletingTask();
				}
			};

			$scope.editTaskName = function(e) {
				if ((e.type === "keypress" && e.which === 13) || e.type === "click") {
					if (!$scope.isEditingTaskName) {
						$scope.isEditingTaskName = true;
						setTimeout(function() {
							angular.element(".modal-title input").focus();
						}, 0);
					} else {
						$scope.isEditingTaskName = false;
						boardAPI
							.updateBoard($scope.board)
							.then(function(res) {
								$scope.board._v++;
							}, function(err) {
								$log.error(err);
							});
					}
				}
			};


			$scope.createComment = function(keyEvent) {
				if (!keyEvent || keyEvent.which === 13) {
					boardAPI
						.createComment($scope.commentInput, $scope.user.username, $scope.user.pictureUrl, $scope.board._id, $scope.category._id, $scope.task._id)
						.then(function(res) {
							$scope.task.comments.unshift(res);
						}, function(err) {
							$log.error(err);
						});
				}
			};

			$scope.ageOfPost = function(t) {
				if (!t) {
					return "no timestamp";
				}

				if (typeof t === "string") {
					t = Date.parse(t);
				}

				var now = Date.now();
				var elapsedMS = Math.floor((now.valueOf() - t.valueOf()));

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
					if (Math.floor(elapsedMS / intervals[timeUnit]) === 1) {
						if (timeUnit === "milliseconds") {
							return "just now";
						}
						return Math.floor(elapsedMS / intervals[timeUnit]) + " " + timeUnit + " ago";
					}
					if (Math.floor(elapsedMS / intervals[timeUnit])) {
						if (timeUnit === "milliseconds") {
							return "just now";
						}
						return Math.floor(elapsedMS / intervals[timeUnit]) + " " + timeUnit + "s ago";
					}
				}

				if (Math.floor(elapsedMS === 0)) {
					return "just now";
				}

				return "no valid timestamp";
			};

			$scope.getCatIndex = function() {
				return $scope.board.categories.findIndex(function(element, i, array) {
					if (element._id === catId) {
						return true;
					}
				});
			};

			$scope.getTaskIndex = function() {
				$scope.categoryIndex = $scope.getCatIndex();

				return $scope.board.categories[$scope.categoryIndex].tasks.findIndex(function(element, i, array) {
					if (element._id === taskId) return true;
				});
			};


			$scope.getChangeableCategories = function() {
				var i = $scope.board.categories.findIndex(function(e) {
					return e._id === $scope.category._id;
				});

				$scope.changeableCategories = JSON.parse(JSON.stringify($scope.board.categories));
				$scope.changeableCategories.splice(i, 1);
			};

			$scope.getAddableUsers = function() {
				$scope.addableUsers = JSON.parse(JSON.stringify($scope.users));

				for (var i = 0; i < $scope.addableUsers.length; i++) {
					for (var j = 0; j < $scope.task.users.length; j++) {
						if ($scope.addableUsers[i]._id === $scope.task.users[j]._id) {
							$scope.addableUsers.splice(i, 1);
							i--;
							break;
						}
					}
				}
			};

			$scope.category = $scope.board.categories[$scope.getCatIndex()];
			$scope.categoryIndex = $scope.getCatIndex();
			$scope.task = $scope.category.tasks[$scope.getTaskIndex()];
			$scope.taskIndex = $scope.getTaskIndex();
			$scope.isEditingTaskName = false;
			$scope.isDeletingTask = false;
			$scope.commentInput = "";
			$scope.repeatTaskName = "";
			$scope.addableUsers = [];
			$scope.changeableCategories = [];
			$scope.getAddableUsers();
			$scope.getChangeableCategories();
		}
	]);
})();
