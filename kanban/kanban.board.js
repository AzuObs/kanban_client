(function() {
	"use strict";

	var kanbanMod = angular.module("kanbanBoardModule", ["ui.sortable", "APIServiceModule"]);


	kanbanMod.config(function($stateProvider) {
		$stateProvider.state("kanban.board", {
			url: "/board/:boardname",
			templateUrl: "/kanban/templates/kanban.board.html",
			controller: "kanbanBoardCtrl",
			resolve: {
				user: function(APIService) {
					return APIService.getUser(sessionStorage.userId);
				},
				board: function(APIService) {
					return APIService.getBoard(sessionStorage.boardId);
				}
			}
		});
	});


	kanbanMod.directive("uiCategory", function() {
		return {
			restrict: "E",
			replace: true,
			templateUrl: "kanban/templates/kanban.category.html",
			controller: "kanbanCategoryCtrl"
		};
	});


	kanbanMod.directive("uiTask", function() {
		return {
			restrict: "E",
			replace: true,
			templateUrl: "kanban/templates/kanban.task.html"
		};
	});


	kanbanMod.directive("uiUser", function() {
		return {
			restrict: "E",
			replace: true,
			templateUrl: "kanban/templates/kanban.user.html"
		};
	});


	kanbanMod.controller("kanbanBoardCtrl", function($scope, $log, $modal, user, board, APIService) {
		$scope.user = user;
		$scope.board = board;
		$scope.users = $scope.board.admins.concat($scope.board.members);

		$scope.createCategory = function(name, keyEvent) {
			if (!keyEvent || keyEvent.which === 13) {
				$scope.newCat = "";

				var params = {
					boardId: $scope.board._id,
					name: name,
					position: $scope.board.categories.length
				};

				APIService
					.createCategory(params)
					.then(function(res) {
						$scope.board.categories.push(res);
					}, function(err) {
						$log.log(err);
					});
			}
		};

		$scope.deleteCategory = function(catId) {
			APIService
				.deleteCategory($scope.board._id, catId)
				.then(function(res) {
					for (var i = 0; i < $scope.board.categories.length; i++) {
						if ($scope.board.categories[i]._id === catId) {
							$scope.board.categories.splice(i, 1);
						}
					}
				}, function(err) {
					$log.log(err);
				});
		};


		$scope.updateBoard = function() {
			APIService
				.updateBoard($scope.board)
				.then(function(res) {
					$scope.board.categories = res;
				}, function(err) {
					$log.log(err);
				});
		};


		$scope.taskSortOptions = {
			placeholder: ".task",
			connectWith: ".task-list",
			stop: function(e, ui) {
				$scope.updateBoard();
			}
		};


		$scope.userSortOpts = {
			placeholder: "task",
			connectWith: ".user-list",
			stop: function(e, ui) {
				// clone user and allocate him
				if ($(e.target).hasClass('user-selection') &&
					ui.item.sortable.droptarget &&
					e.target != ui.item.sortable.droptarget[0]) {
					var ids = ui.item.sortable.droptarget[0].id;
					var cId = ids.substring(2, ids.search(" "));
					var tId = ids.substring(ids.search("t:") + 2, ids.length);
					var wId = ui.item.sortable.model._id;

					$scope.user.users = boardusers.slice();
					$scope.updateCategories();
				}
			}
		};


		$scope.taskModal = function(_user, _board, _cat, _task) {
			var modalInstance = $modal.open({
				animation: true,
				size: "md",
				templateUrl: 'kanban/templates/kanban.comments.html',
				controller: 'kanbanCommentsController',
				resolve: {
					user: function() {
						return _user;
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
	});

	kanbanMod.controller("kanbanCategoryCtrl", function($scope, APIService) {
		$scope.categorySortOptions = {
			stop: function(e, ui) {
				$scope.updateBoard();
			}
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

				var params = {
					boardId: $scope.board._id,
					categoryId: category._id,
					name: name,
					position: category.tasks.length
				};

				APIService
					.createTask(params)
					.then(function(res) {
						category.tasks.push(res);
					}, function(err) {
						$log.log(err);
					});
			}
		};
	});


	kanbanMod.controller("kanbanCommentsController",
		function($scope, $modalInstance, $log, APIService, user, board, cat, task) {
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
		});


})();
