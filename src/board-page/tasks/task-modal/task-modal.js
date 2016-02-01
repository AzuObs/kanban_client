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
		"$scope", "$modalInstance", "boardFactory", "user", "catId", "taskId",
		function($scope, $modalInstance, boardFactory, user, catId, taskId) {

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

				return $scope.addableUsers;
			};


			$scope.getChangeableCategories = function() {
				var i = $scope.board.categories.findIndex(function(e) {
					return e._id === $scope.category._id;
				});

				$scope.changeableCategories = JSON.parse(JSON.stringify($scope.board.categories));
				$scope.changeableCategories.splice(i, 1);

				return $scope.changeableCategories;
			};


			$scope.getTaskIndex = function() {
				var catIndex = $scope.getCatIndex();

				return $scope.board.categories[catIndex].tasks.findIndex(function(element, i, array) {
					if (element._id === taskId) {
						return true;
					}
				});
			};


			$scope.getCatIndex = function() {
				return $scope.board.categories.findIndex(function(element, i, array) {
					if (element._id === catId) {
						return true;
					}
				});
			};


			$scope.ageOfPost = function(t) {
				// t is currently type "string" because mongodb stores it 
				// as string, but it could change in the future
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
						//post is 1ms old
						if (timeUnit === "milliseconds") {
							return "just now";
						}

						//1 qty of interval unit
						return Math.floor(elapsedMS / intervals[timeUnit]) + " " + timeUnit + " ago";
					}
					if (Math.floor(elapsedMS / intervals[timeUnit])) {
						//post is less then 1000ms old
						if (timeUnit === "milliseconds") {
							return "just now";
						}

						//n qties of interval unit
						return Math.floor(elapsedMS / intervals[timeUnit]) + " " + timeUnit + "s ago";
					}
				}

				if (Math.floor(elapsedMS === 0)) {
					return "just now";
				}

				return "not a valid timestamp";
			};


			$scope.createComment = function() {
				boardFactory.createComment($scope.commentInput, user, $scope.task, $scope.category);
			};


			$scope.deleteTask = function() {
				// var category, task;
				// var taskIndex = $scope.getTaskIndex();
				// $scope.category.tasks.splice(taskIndex, 1);

				boardFactory.deleteTask($scope.category, $scope.task)
					.then(function() {
						$scope.closeModal();
					});
			};


			$scope.closeModal = function() {
				$modalInstance.dismiss();
			};


			$scope.addUserToTask = function(user) {
				$scope.task.users.push(user);

				boardFactory.updateBoard()
					.then(function() {
						$scope.getAddableUsers();
					});
			};


			$scope.moveTaskToCategoryLocally = function(destCat) {
				var srcTaskIdx, srcCatIndex, destCatIdx;
				srcTaskIdx = $scope.getTaskIndex;
				srcCatIndex = $scope.getCatIndex();
				catId = destCat._id;

				//remove task from old category
				$scope.category.tasks.splice(srcTaskIdx, 1);

				//change category
				destCatIdx = $scope.getCatIndex($scope, catId);
				$scope.category = $scope.board.categories[destCatIdx];

				//add task to new category
				$scope.category.tasks.push($scope.task);

				//get new task index and changeable categories
				$scope.getChangeableCategories();
			};


			$scope.moveTaskToCategory = function(category) {
				$scope.moveTaskToCategoryLocally(category);

				boardFactory.updateBoard();
			};


			$scope.removeUserFromTask = function(user) {
				$scope.removeUserFromTaskLocally(user);

				boardFactory.updateBoard()
					.then(function() {
						$scope.getAddableUsers();
					});
			};


			$scope.removeUserFromTaskLocally = function(user) {
				var i = $scope.task.users.findIndex(function(e) {
					return e._id === user._id;
				});

				if (i > -1) {
					$scope.task.users.splice(i, 1);
				}
			};

			$scope.toggleIsEditingTitle = function() {
				$scope.isEditingTitle = !$scope.isEditingTitle;
			};


			$scope.updateTitle = function() {
				boardFactory.updateBoard();
			};


			$scope.board = boardFactory.getBoardSync();
			$scope.category = $scope.board.categories[$scope.getCatIndex()];
			$scope.task = $scope.category.tasks[$scope.getTaskIndex()];
			$scope.isEditingTitle = false;
			$scope.commentInput = "";
			$scope.addableUsers = $scope.getAddableUsers();
			$scope.changeableCategories = $scope.getChangeableCategories();
		}
	]);
})();
