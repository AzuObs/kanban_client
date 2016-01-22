(function() {
	"use strict";

	var module = angular.module("boardAPIModule", ["serverAPIModule"]);

	module.factory("boardAPI", ["serverAPI", "$log", "$q", function(serverAPI, $log, $q) {
		var user, board, boards, boardUsers;

		var boardInterface = {
			getUser: function(userId) {
				var defer = $q.defer();

				serverAPI
					.getUser(userId)
					.then(function(res) {
						user = res;
						defer.resolve(res);
					}, function(err) {
						defer.reject(err);
					});

				return defer.promise;
			},

			getBoardSync: function() {
				return board;
			},


			getBoard: function(boardId) {
				var defer = $q.defer();

				serverAPI
					.getBoard(boardId)
					.then(function(res) {
						board = res;
						defer.resolve(res);
					}, function(err) {
						$log.error(err);
						defer.reject(err);
					});

				return defer.promise;
			},

			getBoardsForUser: function(userId) {
				var defer = $q.defer();

				serverAPI
					.getBoardsForUser(userId)
					.then(function(res) {
						boards = res;
						defer.resolve(res);
					}, function(err) {
						defer.reject(err);
					});

				return defer.promise;
			},


			createBoard: function(name) {
				var defer = $q.defer();

				serverAPI
					.createBoard(user._id, name)
					.then(function(res) {
						if (boards) {
							boards.unshift(res);
						}
						defer.resolve(res);
					}, function(err) {
						$log.error(err);
						defer.reject(err);
					});

				return defer.promise;
			},

			deleteBoard: function(boardId) {
				var defer = $q.defer();

				serverAPI
					.deleteBoard(boardId)
					.then(function(res) {
						for (var i = 0; i < boards.length; i++) {
							if (boards[i]._id === boardId) {
								boards.splice(i, 1);
							}
						}
						defer.resolve(res);
					}, function(err) {
						$log.error(err);
						defer.reject(err);
					});

				return defer.promise;
			},

			updateBoard: function(_board_) {
				var board = board || _board_;

				var defer = $q.defer();

				serverAPI
					.updateBoard(board)
					.then(function() {
						board._v++;
						defer.resolve();
					}, function(err) {
						$log.error(err);
						defer.reject(err);
					});

				return defer.promise;
			},

			getBoardUsersSync: function() {
				boardUsers = board.admins.concat(board.members);
				return boardUsers;
			},

			addMemberToUserSelection: function(userEmail) {
				var defer = $q.defer();

				serverAPI
					.addMemberToUserSelection(board, userEmail)
					.then(function(res) {
						board.members.push(res);
						boardUsers.push(res);
						defer.resolve(res);
					}, function(err) {
						$log.error(err);
						defer.reject(err);
					});

				return defer;
			},

			createComment: function(content, user, task, cat) {
				var defer = $q.defer();

				serverAPI
					.createComment(
						content,
						user.username,
						user.pictureUrl,
						task._id,
						cat._id,
						board._id)
					.then(function(res) {
						task.comments.unshift(res);
						defer.resolve(res);
					}, function(err) {
						$log.error(err);
						defer.reject(err);
					});

				return defer;
			},


			createTask: function(name, cat) {
				var defer = $q.defer();

				serverAPI
					.createTask(
						name,
						cat._id,
						board._id)
					.then(function(res) {
						cat.tasks.push(res);
						defer.resolve(res);
					}, function(err) {
						$log.error(err);
						defer.reject(err);
					});

				return defer.promise;
			},


			createCategory: function(name) {
				var defer = $q.defer();

				serverAPI
					.createCategory(board._id, name)
					.then(function(res) {
						board.categories.push(res);
						defer.resolve(res);
					}, function(err) {
						$log.error(err);
						defer.reject(err);
					});

				return defer.promise;
			},


			deleteCategory: function(cat) {
				var defer = $q.defer();

				serverAPI
					.deleteCategory(board._id, cat._id)
					.then(function() {
						for (var i = 0; i < board.categories.length; i++) {
							if (board.categories[i]._id === cat._id) {
								board.categories.splice(i, 1);
							}
						}
						defer.resolve(res);
					}, function(err) {
						$log.error(err);
						defer.reject(err);
					});

				return defer.promise;
			},


			deleteTask: function(cat, task) {
				var defer = $q.defer();

				serverAPI
					.deleteTask(board._id, cat._id, task._id)
					.then(function() {
						for (var i = 0; i < cat.tasks.length; i++) {
							if (cat.tasks[i]._id === task._id) {
								cat.tasks.splice(i, 1);
							}
						}
						defer.resolve(res);
					}, function(err) {
						$log.error(err);
						defer.reject(err);
					});
				return defer.promise;
			}
		};

		return boardInterface;
	}]);
})();
