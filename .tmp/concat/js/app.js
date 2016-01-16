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
				boardAPI
					.createTask($scope.board._id, category._id, $scope.taskName, category.tasks.length)
					.then(function(res) {
						$scope.addTask(category, res);
					}, function(err) {
						$log.error(err);
					});

				$scope.resetTaskName();
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

(function() {
	"use strict";

	var module = angular.module("taskDirectiveModule", ["boardAPIModule", "ui.bootstrap", "ui.sortable", "userDirectiveModule"]);

	module.directive("kbTask", function() {
		return {
			restrict: "E",
			replace: true,
			templateUrl: "board/tasks/task-directive/task-directive.html",
			controller: "kbTaskCtrl"
		};
	});

	module.controller("kbTaskCtrl", ["boardAPI", "$scope", "$log", function(boardAPI, $scope, $log) {
		$scope.deleteTask = function(category, taskId) {
			boardAPI
				.deleteTask($scope.board._id, category._id, taskId)
				.then(function(res) {
					for (var i = 0; i < category.tasks.length; i++) {
						if (category.tasks[i]._id === taskId) {
							category.tasks.splice(i, 1);
						}
					}
				}, function(err) {
					$log.error(err);
				});
		};
	}]);
})();

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
					if (element._id === catId) return true;
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

(function() {
	"use strict";

	var module = angular.module("categoryModule", ["boardAPIModule", "categoryDirectiveModule", "ui.bootstrap", "ui.sortable"]);


	module.controller("categoryCtrl", ["$scope", "$log", "boardAPI", function($scope, $log, boardAPI) {
		$scope.newCat = "";

		$scope.createCategory = function(keyEvent) {
			if (!keyEvent || keyEvent.which === 13) {
				boardAPI
					.createCategory($scope.board._id, $scope.newCat)
					.then(function(res) {
						$scope.board.categories.push(res);
					}, function(err) {
						$log.error(err);
					});

				$scope.newCat = "";
			}
		};

		$scope.deleteLocalCategory = function(catId) {
			for (var i = 0; i < $scope.board.categories.length; i++) {
				if ($scope.board.categories[i]._id === catId) {
					$scope.board.categories.splice(i, 1);
				}
			}
		};

		$scope.deleteCategory = function(catId) {
			boardAPI
				.deleteCategory($scope.board._id, catId)
				.then(function(res) {
					$scope.deleteLocalCategory(catId);
				}, function(err) {
					$log.error(err);
				});
		};

		$scope.categorySortOpts = {
			horizontal: true,
			tolerance: "pointer",
			distance: 1,
			cursor: "move",
			opacity: 0.3,
			scroll: true,
			scrollSensitivity: 20,
			activate: function(e, ui) {
				//fix height of placeholder
				var height = $(ui.item[0].children[0]).css("height");
				$(ui.placeholder[0]).css("height", height);
			},
			stop: function(e, ui) {
				$scope.updateBoard();
			}
		};
	}]);

})();
