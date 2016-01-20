(function() {
	"use strict";

	var module = angular.module("boardAPIModule", ["serverAPIModule"]);

	module.factory("boardAPI", ["serverAPI", "$log", "$q", function(serverAPI, $log, $q) {
		var board, boardUsers;

		var boardInterface = {
			setBoard: function(_board_) {
				board = _board_;
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

			getBoardUsers: function() {
				console.log(board);
				boardUsers = board.admins.concat(board.members);
				return boardUsers;
			},

			updateBoard: function() {
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

			addMemberToUserSelection: function(userEmail) {
				serverAPI
					.addMemberToUserSelection(board._id, userEmail)
					.then(function(res) {
						board.members.push(res);
						boardUsers.push(res);
					}, function(err) {
						$log.error(err);
					});
			},

			createComment: function(content, user, task, cat) {
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
					}, function(err) {
						$log.error(err);
					});
			},

			createTask: function(name, cat) {
				serverAPI
					.createTask(
						name,
						cat._id,
						board._id)
					.then(function(res) {
						cat.tasks.push(res);
					}, function(err) {
						$log.error(err);
					});
			},

			createCategory: function(name) {
				serverAPI
					.createCategory(board._id, name)
					.then(function(res) {
						board.categories.push(res);
					}, function(err) {
						$log.error(err);
					});
			},

			deleteCategory: function(cat) {
				serverAPI
					.deleteCategory(board._id, cat._id)
					.then(function() {
						for (var i = 0; i < board.categories.length; i++) {
							if (board.categories[i]._id === cat._id) {
								board.categories.splice(i, 1);
							}
						}
					}, function(err) {
						$log.error(err);
					});
			},

			deleteTask: function(cat, task) {
				serverAPI
					.deleteTask(board._id, cat._id, task._id)
					.then(function() {
						for (var i = 0; i < cat.tasks.length; i++) {
							if (cat.tasks[i]._id === task._id) {
								cat.tasks.splice(i, 1);
							}
						}
					}, function(err) {
						$log.error(err);
					});
			}
		};

		return boardInterface;
	}]);
})();
