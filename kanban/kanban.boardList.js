(function() {
	"use strict";

	var kanbanMod = angular.module("kanbanBoardListModule", ["userServiceModule"]);

	kanbanMod.config(function($stateProvider) {
		$stateProvider.state("kanban.boardList", {
			url: "/user/:username",
			templateUrl: "kanban/templates/kanban.list.html",
			controller: "kanbanBoardListCtrl",
			resolve: {
				user: function($q, userService) {
					var q = $q.defer();
					userService
						.getUser()
						.then(function(res) {
							q.resolve(res);
						}, function(err) {
							q.reject(err);
						});
					return q.promise;
				}
			}
		});
	});

	kanbanMod.controller("kanbanBoardListCtrl", function($scope, user, userService) {
		$scope.user = user;
		$scope.boardName = "";

		$scope.createBoard = function() {
			userService
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

		$scope.editBoard = function(boardId) {
			// open modal?
		};

		$scope.deleteBoard = function(boardId) {
			var params = {
				userId: $scope.user._id,
				boardId: boardId
			};

			userService
				.deleteBoard(params)
				.then(function(res) {
					var id = findIndexOfBoard($scope.user, boardId);
					$scope.user.boards.splice(id, 1);
				}, function(err) {
					console.log(err);
				});
		};

	});

	var findIndexOfBoard = function(user, boardId) {
		if (user === "undefined" || boardId === "undefined") {
			throw "user OR boardId undefined @findIndexOfBoard";
		}

		for (var i = 0; i < user.boards.length; i++) {
			if (user.boards[i]._id === boardId) {
				return i;
			}
		}

		throw "boardId does not match any boards @findIndexOfBoard";
	};

})();
