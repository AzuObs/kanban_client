(function() {
	"use strict";

	var module = angular.module("boardFactoryModule", [
		"serverAPIModule", "errorHandlerModule"
	]);

	module.factory("boardFactory", [
		"serverAPI", "errorHandler", "$log", "$q",
		function(serverAPI, errorHandler, $log, $q) {
			var board = {},
				boardUsers = [],
				boardFactory;

			boardFactory = {
				getBoardSync: function() {
					return board;
				},


				getBoard: function(boardId) {
					var defer = $q.defer();

					serverAPI
						.getBoard(boardId)
						.then(function(res) {
							board = res;
							boardFactory.getBoardUsersSync();

							defer.resolve(res);
						}, function(err) {
							errorHandler.handleHttpError(err);
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
							errorHandler.handleHttpError(err);
						});

					return defer.promise;
				},


				getBoardUsersSync: function() {
					// empty boardUsers
					while (boardUsers.length) {
						boardUsers.pop();
					}

					// add admins
					for (var i = 0; i < board.admins.length; i++) {
						boardUsers.push(board.admins[i]);
					}

					// add members
					for (i = 0; i < board.members.length; i++) {
						boardUsers.push(board.members[i]);
					}

					return boardUsers;
				},


				addMemberToBoard: function(email) {
					var defer = $q.defer();

					var memberIsDuplicate = function(email) {
						for (var i = 0; i < board.members.length; i++) {
							if (board.members[i].email === email) {
								return true;
							}
						}

						for (i = 0; i < board.admins.length; i++) {
							if (board.admins[i].email === email) {
								return true;
							}
						}
					};

					if (memberIsDuplicate(email)) {
						$log.error("member is already exists in the board object");
						defer.reject();
					} else {
						serverAPI
							.addMemberToBoard(board._id, email)
							.then(function(res) {
								board.members.push(res);
								boardUsers.push(res);
								defer.resolve(res);
							}, function(err) {
								errorHandler.handleHttpError(err);
							});
					}

					return defer;
				},


				removeUserFromBoard: function(user) {
					var removeUserLocally = function(user) {
						var i, j, k;

						// remove from board.admins
						for (i = 0; i < board.admins.length; i++) {
							if (board.admins[i]._id === user._id) {
								board.admins.splice(i, 1);
								break;
							}
						}

						// remove from board.members
						for (i = 0; i < board.members.length; i++) {
							if (board.members[i]._id === user._id) {
								board.members.splice(i, 1);
								break;
							}
						}

						// remove from tasks
						for (i = 0; i < board.categories.length; i++) {
							var category = board.categories[i];

							for (j = 0; j < category.tasks.length; j++) {
								var task = category.tasks[j];

								for (k = 0; k < task.users.length; k++) {
									var taskUser = task.users[k];

									if (taskUser._id === user._id) {
										task.users.splice(k, 1);
										break;
									}
								}
							}
						}
					};

					removeUserLocally(user);

					var defer = $q.defer();

					boardFactory
						.updateBoard()
						.then(function() {
							boardFactory.getBoardUsersSync();
							defer.resolve();
						});

					return defer.promise;
				},


				createComment: function(cat, task, user, content) {
					var defer = $q.defer();

					serverAPI
						.createComment(
							board._id,
							cat._id,
							task._id,
							user.username,
							user.pictureUrl,
							content)
						.then(function(res) {
							task.comments.unshift(res);
							defer.resolve(res);
						}, function(err) {
							errorHandler.handleHttpError(err);
						});

					return defer;
				},


				createTask: function(cat, name) {
					var defer = $q.defer();

					serverAPI
						.createTask(
							board._id,
							cat._id,
							name)
						.then(function(res) {
							cat.tasks.push(res);
							defer.resolve(res);
						}, function(err) {
							errorHandler.handleHttpError(err);
						});

					return defer.promise;
				},


				addUserToTask: function(task, user) {
					var defer = $q.defer();

					var addUserLocally = function(task, user) {
						task.users.push(user);
					};

					addUserLocally(task, user);

					boardFactory
						.updateBoard()
						.then(function() {
							defer.resolve();
						});

					return defer;
				},


				removeUserFromTask: function(task, user) {
					var defer = $q.defer();

					var removeUserFromTaskLocally = function(task, user) {
						var i = task.users.findIndex(function(e) {
							return e._id === user._id;
						});

						if (i > -1) {
							task.users.splice(i, 1);
						}
					};

					removeUserFromTaskLocally(task, user);

					boardFactory
						.updateBoard()
						.then(function() {
							defer.resolve();
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
							errorHandler.handleHttpError(err);
						});

					return defer.promise;
				},


				deleteCategory: function(cat) {
					var defer = $q.defer();

					var deleteCategoryLocally = function(cat) {
						for (var i = 0; i < board.categories.length; i++) {
							if (board.categories[i]._id === cat._id) {
								board.categories.splice(i, 1);
							}
						}
					};

					serverAPI
						.deleteCategory(board._id, cat._id)
						.then(function(res) {
							deleteCategoryLocally(cat);
							defer.resolve(res);
						}, function(err) {
							errorHandler.handleHttpError(err);
						});

					return defer.promise;
				},


				deleteTask: function(cat, task) {
					var defer = $q.defer();

					var deleteTaskLocally = function(cat, task) {
						for (var i = 0; i < cat.tasks.length; i++) {
							if (cat.tasks[i]._id === task._id) {
								cat.tasks.splice(i, 1);
							}
						}
					};

					serverAPI
						.deleteTask(board._id, cat._id, task._id)
						.then(function(res) {
							deleteTaskLocally(cat, task);
							defer.resolve(res);
						}, function(err) {
							errorHandler.handleHttpError(err);
						});

					return defer.promise;
				}
			};

			return boardFactory;
		}
	]);
})();
