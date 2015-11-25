(function() {
	"use strict";

	var kanbanMod = angular.module("kanbanBoardListModule", ["APIServiceModule"]);

	kanbanMod.config(function($stateProvider) {
		$stateProvider.state("kanban.boardList", {
			url: "/user/:username",
			templateUrl: "kanban/templates/kanban.list.html",
			controller: "kanbanBoardListCtrl",
			resolve: {
				user: function($q, APIService) {
					var q = $q.defer;

					APIService.getUser(sessionStorage.userId)
						.success(function(res) {
							q.resolve(res);
						})
						.error(function(err) {
							q.reject(res);
						});

					return q.promise;
				},
				boards: function($q, APIService) {
					var q = $q.defer();

					APIService.getBoardsForUser(sessionStorage.userId)
						.success(function(res) {
							q.resolve(res);
						})
						.error(function(err) {
							q.reject(res);
						});

					return q.promise;
				}

			}
		});
	});

	kanbanMod.controller("kanbanBoardListCtrl", function($scope, $modal, boards, user, APIService) {
		console.log(APIService);
		console.log(user);
		console.log(boards);

		$scope.user = user;
		$scope.boards = boards;

		$scope.createBoard = function() {
			APIService
				.createBoard({
					userId: sessionStorage.userId,
					name: $scope.boardName
				})
				.then(function(res) {
					$scope.user.boards.push(res);
				}, function(err) {
					console.log(err);
				});
		};

		$scope.editBoard = function(_board) {
			openEditBoardModal($scope.user, _board);
		};

		$scope.deleteBoard = function(_board) {
			var params = {
				userId: $scope.user._id,
				boardId: _boardId._id
			};

			APIService
				.deleteBoard(params)
				.then(function(res) {
					var id = findIndexOfBoard($scope.user, boardId);
					$scope.user.boards.splice(id, 1);
				}, function(err) {
					console.log(err);
				});
		};

		var openEditBoardModal = function(_user, _board) {
			$modal.open({
				animation: true,
				size: "md",
				templateUrl: "kanban/templates/kanban.boardEdit.html",
				controller: "editBoardCtrl",
				resolve: {
					user: function() {
						return _user;
					},
					board: function() {
						return _board;
					}
				}
			});
		};
	});


	kanbanMod.controller("editBoardCtrl", function($scope, $modalInstance, user, board) {
		$scope.user = user;
		$scope.board = board;
		$scope.options = [{
			name: "change user",
			type: "text"
		}, {
			name: "change name",
			type: "text"
		}, {
			name: "change position in list",
			type: "text"
		}];

		$scope.closeModal = function() {
			$modalInstance.dismiss();
		};
	});

})();
