(function() {
	"use strict";

	var kanbanMod = angular.module("kanbanBoardModule", []);


	kanbanMod.config(["$stateProvider", function($stateProvider) {
		$stateProvider.state("kanban.board", {
			views: {
				"": {
					templateUrl: "/kanban/html/abstract-board.html",
					controller: "kanbanBoardCtrl"
				},
				"categories@kanban.board": {
					templateUrl: "/kanban/html/board.categories.html",
					controller: "kanbanCategoryCtrl"
				},
				"userpanel@kanban.board": {
					templateUrl: "/kanban/html/board.userpanel.html",
					controller: "kanbanUserPanelCtrl"
				}
			},
			url: "/board/:boardName",
			resolve: {
				user: function(APIService) {
					return APIService.getUser(sessionStorage.userId);
				},
				board: function(APIService) {
					return APIService.getBoard(sessionStorage.boardId);
				}
			}
		});
	}]);


	kanbanMod.directive("uiTask", function() {
		return {
			restrict: "E",
			replace: true,
			templateUrl: "kanban/html/directive.task.html"
		};
	});


	kanbanMod.directive("uiUser", function() {
		return {
			restrict: "E",
			replace: true,
			templateUrl: "kanban/html/directive.user.html"
		};
	});


	kanbanMod.controller("kanbanBoardCtrl", function($scope, $log, $modal, user, board, APIService) {
		$scope.user = user;
		$scope.board = board;
		$scope.users = $scope.board.admins.concat($scope.board.members);


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
				templateUrl: 'kanban/html/modal.comments.html',
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
