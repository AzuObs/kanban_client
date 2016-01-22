(function() {
	"use strict";

	var module = angular.module("boardFactoryModule", ["serverAPIModule"]);

	module.factory("boardFactory", ["serverAPI", "$log", "$q", function(serverAPI, $log, $q) {
		var board, boardUsers;

		var boardInterface = {
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

			updateBoard: function(_board_) {
				board = _board_ || board;
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
					.then(function(res) {
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
					.then(function(res) {
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
