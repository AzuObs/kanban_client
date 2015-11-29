(function() {
	"use strict";

	var kanbanMod = angular.module("kanbanBoardModule", []);


	kanbanMod.config(function($stateProvider) {
		$stateProvider.state("kanban.board", {
			url: "/board/:boardName",
			templateUrl: "/kanban/html/board.html",
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

		$scope.categorySortOpts = {
			start: function(e, ui) {
				// $(e.target).data("ui-sortable").floating = true;
			},
			sort: function(e, ui) {
				//every mouse move (100x times)
				// console.log("sort");
			},
			over: function(e, ui) {
				//once we enter the list
				// console.log("over");
			},
			out: function(e, ui) {
				//once we leave the list
				// console.log("out");
			},
			change: function(e, ui) {
				// console.log("debugger skipped");
				//once the DOM changes - this is buggy and needs mouse to go up/down to activate
				// console.log("change");
			},
			update: function(e, ui) {
				// console.log("update");
			},
			stop: function(e, ui) {
				// console.log("stop");
				// $scope.updateBoard();
			},
			horizontal: true,
			tolerance: "pointer",
			distance: 1,
			cursor: "move",
			opacity: 0.3,
			scroll: true,
			scrollSensitivity: 20
		};

		$scope.editUser = function(user) {
			openEditUser(board, user);
		};

		var openEditUser = function(board, user) {
			$modal.open({
				animation: true,
				size: "md",
				templateUrl: "kanban/html/modal.boardUserEdit.html",
				controller: "editUserCtrl",
				resolve: {
					user: function() {
						return user;
					},
					board: function() {
						return board;
					}
				}
			});
		};


		$scope.setAddMember = function(value) {
			$scope.addMemberInput = value;
		};

		$scope.addMemberFn = function(keyEvent) {
			if (!keyEvent || keyEvent.which === 13) {
				APIService.addMemberToBoard(board, $scope.addMemberInput)
					.then(function(res) {
						$scope.board = res;
						$scope.users = $scope.board.admins.concat($scope.board.members);
					}, function(err) {
						console.log(err);
					});
			}
		};

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


	kanbanMod.controller("editUserCtrl", function($scope, $modalInstance, APIService, user, board) {
		$scope.user = user;
		$scope.board = board;

		$scope.options = [{
			name: "change role",
			type: "text"
		}, {
			name: "change position in list",
			type: "text"
		}];

		$scope.removeUserFromBoard = function() {
			APIService.removeUserFromBoard($scope.board, $scope.user)
				.then(function(res) {
					var iMember = $scope.board.members.indexOf($scope.user._id);
					if (iMember >= 0) {
						$scope.board.members.splice(iMember, 1);
					}

					var iAdmins = $scope.board.admins.indexOf($scope.user._id);
					if (iAdmin >= 0) {
						$scope.board.admins.splice(iAdmin, 1);
					}

				}, function(err) {
					console.log(err);
				});
		};

		$scope.closeModal = function() {
			$modalInstance.dismiss();
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
