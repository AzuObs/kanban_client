(function() {
	"use strict";

	var module = angular.module("taskModalModule", [
		"boardFactoryModule",
		"ui.bootstrap",
		"userDirectiveModule",
		"editableTextDirectiveModule",
		"deletableObjectDirectiveModule"
	]);


	module.controller("taskModalCtrl", [
		"$scope", "$modalInstance", "$log", "boardFactory", "user", "catId", "taskId",
		function($scope, $modalInstance, $log, boardFactory, user, catId, taskId) {
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

				boardFactory.updateBoard()
					.then(function() {
						$scope.getAddableUsers();
					}, function(err) {
						// 
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

				boardFactory.updateBoard();
			};

			$scope.addUserToTask = function(user) {
				$scope.task.users.push(user);

				boardFactory.updateBoard()
					.then(function() {
						$scope.getAddableUsers();
					});
			};

			$scope.closeModal = function() {
				$modalInstance.dismiss();
			};

			$scope.deleteTask = function() {
				$scope.category.tasks.splice($scope.taskIndex, 1);

				boardFactory.updateBoard()
					.then(function() {
						$scope.closeModal();
					});
			};

			$scope.toggleIsEditingTitle = function() {
				$scope.isEditingTitle = !$scope.isEditingTitle;
			};

			$scope.createComment = function(keyEvent) {
				if (!keyEvent || keyEvent.which === 13) {
					boardFactory.createComment($scope.commentInput, $scope.user, $scope.task, $scope.category);
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
					if (element._id === taskId) {
						return true;
					}
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
				$scope.addableUsers = JSON.parse(JSON.stringify(boardFactory.getBoardUsersSync()));

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

			$scope.board = boardFactory.getBoardSync();
			$scope.category = $scope.board.categories[$scope.getCatIndex()];
			$scope.categoryIndex = $scope.getCatIndex();
			$scope.task = $scope.category.tasks[$scope.getTaskIndex()];
			$scope.taskIndex = $scope.getTaskIndex();
			$scope.isEditingTitle = false;
			$scope.updateTitle = boardFactory.updateBoard;
			$scope.commentInput = "";
			$scope.user = user;
			$scope.users = $scope.task.users;
			$scope.addableUsers = [];
			$scope.changeableCategories = [];
			$scope.getAddableUsers();
			$scope.getChangeableCategories();
		}
	]);
})();
