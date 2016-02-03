(function() {
	"use strict";

	describe("boardFactory", function() {
		var $scope, boardFactory, serverAPI, errorHandler;

		beforeEach(function() {
			module("boardFactoryModule");
			inject(function($rootScope, _boardFactory_, _serverAPI_, _errorHandler_) {
				$scope = $rootScope.$new();
				boardFactory = _boardFactory_;
				errorHandler = _errorHandler_;
				serverAPI = _serverAPI_;
			});
		});


		describe("boardFactory.getBoardSync()", function() {
			beforeEach(inject(function($q) {
				spyOn(serverAPI, "getBoard").and.callFake(function() {
					var defer = $q.defer();
					defer.resolve({
						name: "board",
						admins: [],
						members: []
					});
					return defer.promise;
				});

				$scope.$apply(function() {
					boardFactory.getBoard();
				});
			}));

			it("is defined", function() {
				expect(boardFactory.getBoardSync).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof boardFactory.getBoardSync).toEqual("function");
			});

			it("return the board synchronously", function() {
				expect(boardFactory.getBoardSync().name).toEqual("board");
			});
		});


		describe("boardFactory.getBoard()", function() {
			var apiCalled, apiCallArgs, defer;

			beforeEach(inject(function($q) {
				spyOn(serverAPI, "getBoard").and.callFake(function() {
					apiCalled = true;
					apiCallArgs = arguments;
					defer = $q.defer();
					return defer.promise;
				});
			}));

			it("is defined", function() {
				expect(boardFactory.getBoard).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof boardFactory.getBoard).toEqual("function");
			});

			it("calls serverAPI.getBoard", function() {
				apiCalled = false;
				boardFactory.getBoard();
				expect(apiCalled).toEqual(true);
			});

			it("calls serverAPI.getBoard with args [boardId]", function() {
				apiCallArgs = [];
				boardFactory.getBoard("id");
				expect(apiCallArgs.length).toEqual(1);
				expect(apiCallArgs[0]).toEqual("id");
			});

			it("stores answer into board variable on resolve", function() {
				expect(boardFactory.getBoardSync()).toEqual(undefined);

				boardFactory.getBoard();
				$scope.$apply(function() {
					defer.resolve({
						name: "board",
						members: [],
						admins: []
					});
				});

				expect(boardFactory.getBoardSync().name).toEqual("board");
			});

			it("calls errorHandler.handleHTTP on reject", function() {
				var called = false;

				spyOn(errorHandler, "handleHttpError").and.callFake(function() {
					called = true;
				});

				$scope.$apply(function() {
					defer.reject("board");
				});

				expect(apiCalled).toEqual(true);
			});
		});


		describe("boardFactory.updateBoard", function() {
			var apiCalled, apiArgs, defer;

			beforeEach(inject(function($q) {
				spyOn(serverAPI, "updateBoard").and.callFake(function() {
					apiCalled = true;
					apiArgs = arguments;
					defer = $q.defer();
					return defer.promise;
				});
			}));

			it("is defined", function() {
				expect(boardFactory.updateBoard).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof boardFactory.updateBoard).toEqual("function");
			});

			it("calls serverAPI.updateBoard", function() {
				apiCalled = false;
				boardFactory.updateBoard();
				expect(apiCalled).toEqual(true);
			});

			it("calls serverAPI with args [board]", function() {
				apiArgs = [];
				boardFactory.updateBoard("foo");

				expect(apiArgs.length).toEqual(1);
				expect(apiArgs[0]).toEqual("foo");
			});

			it("updates board version on resolve", function() {
				var board = {
					_v: 0
				};

				boardFactory.updateBoard(board);
				$scope.$apply(function() {
					defer.resolve();
				});

				expect(board._v).toEqual(1);
			});


			it("calls errorHandler on reject", function() {
				var called = false;

				spyOn(errorHandler, "handleHttpError").and.callFake(function() {
					called = true;
				});

				boardFactory.updateBoard();
				$scope.$apply(function() {
					defer.reject();
				});

				expect(called).toEqual(true);
			});
		});


		describe("boardFactory.getBoardUsersSync()", function() {
			beforeEach(inject(function($q) {
				spyOn(serverAPI, "getBoard").and.callFake(function() {
					var defer = $q.defer();
					defer.resolve({
						members: [1, 2],
						admins: [3, 4]
					});
					return defer.promise;
				});

				$scope.$apply(function() {
					boardFactory.getBoard();
				});
			}));

			it("is defined", function() {
				expect(boardFactory.getBoardUsersSync).toBeDefined();
			});

			it("is an function", function() {
				expect(typeof boardFactory.getBoardUsersSync).toEqual("function");
			});

			it("returns the board users", function() {
				expect(boardFactory.getBoardUsersSync()).toEqual([3, 4, 1, 2]);
			});
		});


		describe("boardFactory.addMemberToBoard", function() {
			var apiCalled, apiCallArgs, defer;

			beforeEach(inject(function($q) {

				spyOn(serverAPI, "addMemberToBoard").and.callFake(function() {
					apiCalled = true;
					apiCallArgs = arguments;
					defer = $q.defer();
					return defer.promise;
				});

				spyOn(serverAPI, "getBoard").and.callFake(function() {
					var getBoardDefer = $q.defer();
					getBoardDefer.resolve({
						_id: "boardid",
						name: "board",
						members: [{
							email: "member"
						}],
						admins: [{
							email: "admin"
						}]
					});
					return getBoardDefer.promise;
				});

				$scope.$apply(function() {
					boardFactory.getBoard();
				});
			}));

			it("is defined", function() {
				expect(boardFactory.addMemberToBoard).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof boardFactory.addMemberToBoard).toEqual("function");
			});

			it("logs an error when member is already in board users", inject(function($log) {
				$log.reset();
				boardFactory.addMemberToBoard("admin");
				expect($log.error.logs[0][0]).toBeDefined();
			}));

			it("calls serverAPI.addMemberToBoard ", function() {
				apiCalled = false;
				boardFactory.addMemberToBoard("new member email");
				expect(apiCalled).toEqual(true);
			});

			it("calls serverAPI with args [boardId, userEmail] ", function() {
				apiCallArgs = [];
				boardFactory.addMemberToBoard("new member email");
				expect(apiCallArgs.length).toEqual(2);
				expect(apiCallArgs[0]).toEqual("boardid");
				expect(apiCallArgs[1]).toEqual("new member email");
			});

			it("updates board.members on resolve", function() {
				var board = boardFactory.getBoardSync();

				expect(board.members.length).toEqual(1);
				expect(board.members[0].email).toEqual("member");

				boardFactory.addMemberToBoard("new member email");
				$scope.$apply(function() {
					defer.resolve({
						email: "new member email"
					});
				});

				expect(board.members.length).toEqual(2);
				expect(board.members[0].email).toEqual("member");
				expect(board.members[1].email).toEqual("new member email");
			});

			it("updates boardUsers on resolve", function() {
				var boardUsers = boardFactory.getBoardUsersSync();

				expect(boardUsers.length).toEqual(2);
				expect(boardUsers[0].email).toEqual("admin");
				expect(boardUsers[1].email).toEqual("member");

				boardFactory.addMemberToBoard("new member email");
				$scope.$apply(function() {
					defer.resolve({
						email: "new member email"
					});
				});

				expect(boardUsers.length).toEqual(3);
				expect(boardUsers[0].email).toEqual("admin");
				expect(boardUsers[1].email).toEqual("member");
				expect(boardUsers[2].email).toEqual("new member email");
			});

			it("calls errorHandler on reject", function() {
				var called = false;

				spyOn(errorHandler, "handleHttpError").and.callFake(function() {
					called = true;
				});

				boardFactory.addMemberToBoard("new member email");
				$scope.$apply(function() {
					defer.reject();
				});

				expect(called).toEqual(true);
			});
		});


		describe("boardFactory.removeUserFromBoard()", function() {
			var apiCalled;

			beforeEach(inject(function($q) {

				spyOn(serverAPI, "getBoard").and.callFake(function() {
					var defer = $q.defer();
					defer.resolve({
						name: "board",
						admins: [{
							_id: "user"
						}],
						members: [{
							_id: "user"
						}],
						categories: [{
							tasks: [{
								users: [{
									_id: "user"
								}]
							}]
						}]
					});
					return defer.promise;
				});

				spyOn(boardFactory, "updateBoard").and.callFake(function() {
					apiCalled = true;
					return $q.defer().promise;
				});

				$scope.$apply(function() {
					boardFactory.getBoard();
				});
			}));


			it("is defined", function() {
				expect(boardFactory.removeUserFromBoard).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof boardFactory.removeUserFromBoard).toEqual("function");
			});

			it("removes a user from admins", function() {
				var board = boardFactory.getBoardSync();
				expect(board.admins.length).toEqual(1);
				expect(board.admins[0]._id).toEqual("user");

				boardFactory.removeUserFromBoard({
					_id: "user"
				});

				expect(board.admins.length).toEqual(0);
			});

			it("removes a user from members", function() {
				var board = boardFactory.getBoardSync();
				expect(board.members.length).toEqual(1);
				expect(board.members[0]._id).toEqual("user");

				boardFactory.removeUserFromBoard({
					_id: "user"
				});

				expect(board.members.length).toEqual(0);
			});

			it("remove a user from tasks", function() {
				var board = boardFactory.getBoardSync();
				expect(board.categories[0].tasks[0].users.length).toEqual(1);
				expect(board.categories[0].tasks[0].users[0]._id).toEqual("user");

				boardFactory.removeUserFromBoard({
					_id: "user"
				});

				expect(board.categories[0].tasks[0].users.length).toEqual(0);
			});

			it("calls boardFactory.updateBoard", function() {
				apiCalled = false;

				boardFactory.removeUserFromBoard({
					_id: "user"
				});

				expect(apiCalled).toEqual(true);
			});
		});


		describe("boardFactory.createComment()", function() {
			var apiCalled, apiCallArgs, defer;

			beforeEach(inject(function($q) {
				spyOn(serverAPI, "getBoard").and.callFake(function() {
					var def = $q.defer();

					def.resolve({
						_id: "boardid",
						admins: [],
						members: [],
						categories: [{
							_id: "categoryid",
							tasks: [{
								_id: "taskid",
								comments: []
							}]
						}]
					});

					return def.promise;
				});

				spyOn(serverAPI, "createComment").and.callFake(function() {
					apiCalled = true;
					apiCallArgs = arguments;
					defer = $q.defer();
					return defer.promise;
				});

				$scope.$apply(function() {
					boardFactory.getBoard();
				});
			}));

			it("is defined", function() {
				expect(boardFactory.createComment).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof boardFactory.createComment).toEqual("function");
			});

			it("calls serverAPI.createComment", function() {
				apiCalled = false;
				boardFactory.createComment({}, {}, {}, {});
				expect(apiCalled).toEqual(true);
			});

			it("calls serverAPI.createComment with args [boardid,catid, taskid,username,userPic,content]",
				function() {
					var args = {
						content: "content",
						user: {
							username: "username",
							pictureUrl: "userPic"
						},
						task: {
							_id: "taskid"
						},
						cat: {
							_id: "categoryid"
						}
					};

					apiCallArgs = [];
					boardFactory.createComment(args.content, args.user, args.task, args.cat);
					expect(apiCallArgs.length).toEqual(6);
					expect(apiCallArgs[0]).toEqual("boardid");
					expect(apiCallArgs[1]).toEqual("categoryid");
					expect(apiCallArgs[2]).toEqual("taskid");
					expect(apiCallArgs[3]).toEqual("username");
					expect(apiCallArgs[4]).toEqual("userPic");
					expect(apiCallArgs[5]).toEqual("content");
				});

			it("adds to comments on resolve", function() {
				var board, task, comments;
				board = boardFactory.getBoardSync();
				task = board.categories[0].tasks[0];
				comments = task.comments;
				expect(comments.length).toEqual(0);

				boardFactory.createComment({}, {}, task, comments);
				$scope.$apply(function() {
					defer.resolve("comment");
				});

				expect(comments.length).toEqual(1);
				expect(comments[0]).toEqual("comment");
			});

			it("calls errorHandler on reject", function() {
				var called = false;

				spyOn(errorHandler, "handleHttpError").and.callFake(function() {
					called = true;
				});

				boardFactory.createComment({}, {}, {}, {});
				$scope.$apply(function() {
					defer.reject();
				});

				expect(called).toEqual(true);
			});
		});


		describe("boardFactory.addTask", function() {
			var apiCalled, apiCallArgs, defer;

			beforeEach(inject(function($q) {
				spyOn(serverAPI, "getBoard").and.callFake(function() {
					var def = $q.defer();

					def.resolve({
						_id: "boardid",
						admins: [],
						members: [],
						categories: [{
							_id: "categoryid",
							tasks: [{
								_id: "taskid",
								comments: []
							}]
						}]
					});

					return def.promise;
				});

				spyOn(serverAPI, "createTask").and.callFake(function() {
					apiCalled = true;
					apiCallArgs = arguments;
					defer = $q.defer();
					return defer.promise;
				});

				$scope.$apply(function() {
					boardFactory.getBoard();
				});
			}));

			it("is defined", function() {
				expect(boardFactory.createTask).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof boardFactory.createTask).toEqual("function");
			});

			it("calls serverAPI.createTask", function() {
				apiCalled = false;
				boardFactory.createTask({}, {});
				expect(apiCalled).toEqual(true);
			});

			it("calls serverAPI with args[boardid, catid, name]", function() {
				var args = {
					name: "name",
					cat: {
						_id: "categoryid"
					}
				};
				apiCallArgs = [];

				boardFactory.createTask(args.name, args.cat);
				expect(apiCallArgs.length).toEqual(3);
				expect(apiCallArgs[0]).toEqual("boardid");
				expect(apiCallArgs[1]).toEqual("categoryid");
				expect(apiCallArgs[2]).toEqual("name");
			});

			it("adds task on resolve", function() {
				var tasks, category;
				category = boardFactory.getBoardSync().categories[0];
				tasks = category.tasks;
				expect(tasks.length).toEqual(1);
				expect(tasks[0]._id).toEqual("taskid");


				boardFactory.createTask({}, category);
				$scope.$apply(function() {
					defer.resolve({
						_id: "new taskid"
					});
				});

				expect(tasks.length).toEqual(2);
				expect(tasks[0]._id).toEqual("taskid");
				expect(tasks[1]._id).toEqual("new taskid");
			});

			it("calls errorHandler on reject", function() {
				var called;

				spyOn(errorHandler, "handleHttpError").and.callFake(function() {
					called = true;
				});

				boardFactory.createTask({}, {});
				$scope.$apply(function() {
					defer.reject();
				});

				expect(called).toEqual(true);
			});
		});


		describe("boardFactory.addUserToTask()", function() {
			var apiCalled, apiCallArgs, defer;

			beforeEach(inject(function($q) {
				spyOn(serverAPI, "getBoard").and.callFake(function() {
					var def = $q.defer();

					def.resolve({
						_id: "boardid",
						admins: [],
						members: [],
						categories: [{
							_id: "categoryid",
							tasks: [{
								_id: "taskid",
								users: [],
								comments: []
							}]
						}]
					});

					return def.promise;
				});

				spyOn(boardFactory, "updateBoard").and.callFake(function() {
					apiCalled = true;
					defer = $q.defer();
					return defer.promise;
				});

				$scope.$apply(function() {
					boardFactory.getBoard();
				});
			}));

			it("is defined", function() {
				expect(boardFactory.addUserToTask).toBeDefined();
			});


			it("is a function", function() {
				expect(typeof boardFactory.addUserToTask).toEqual("function");
			});


			it("adds user to board", function() {
				var board, task;
				board = boardFactory.getBoardSync();
				task = board.categories[0].tasks[0];
				expect(task.users.length).toEqual(0);

				boardFactory.addUserToTask(task, "user");
				expect(task.users.length).toEqual(1);
				expect(task.users[0]).toEqual("user");
			});


			it("calls boardFactory.update", function() {
				apiCalled = false;
				boardFactory.addUserToTask({
					users: []
				}, {});
				expect(apiCalled).toEqual(true);
			});
		});


		describe("boardFactory.removeUserFromTask", function() {
			var apiCalled, defer;

			beforeEach(inject(function($q) {
				spyOn(serverAPI, "getBoard").and.callFake(function() {
					var def = $q.defer();

					def.resolve({
						_id: "boardid",
						admins: [],
						members: [],
						categories: [{
							_id: "categoryid",
							tasks: [{
								_id: "taskid",
								users: [],
								comments: []
							}]
						}]
					});

					return def.promise;
				});

				spyOn(boardFactory, "updateBoard").and.callFake(function() {
					apiCalled = true;
					defer = $q.defer();
					return defer.promise;
				});

				$scope.$apply(function() {
					boardFactory.getBoard();
				});
			}));

			it("is defined", function() {
				expect(boardFactory.removeUserFromTask).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof boardFactory.removeUserFromTask).toEqual("function");
			});

			it("removes a user from a task", function() {
				var task, user;
				task = boardFactory.getBoardSync().categories[0].tasks[0];
				user = {
					_id: "userid"
				};
				task.users.push(user);
				expect(task.users.length).toEqual(1);

				boardFactory.removeUserFromTask(task, user);
				expect(task.users.length).toEqual(0);
			});

			it("calls serverAPI.updateBoard", function() {
				apiCalled = false;
				boardFactory.removeUserFromTask({
					users: []
				}, {
					_id: "userid"
				});
				expect(apiCalled).toEqual(true);
			});
		});


		describe("boardFactory.createCategory", function() {
			var apiCalled, apiCallArgs, defer;

			beforeEach(inject(function($q) {
				spyOn(serverAPI, "getBoard").and.callFake(function() {
					var def = $q.defer();

					def.resolve({
						_id: "boardid",
						admins: [],
						members: [],
						categories: [{
							_id: "categoryid",
							tasks: [{
								_id: "taskid",
								users: [],
								comments: []
							}]
						}]
					});

					return def.promise;
				});

				spyOn(serverAPI, "createCategory").and.callFake(function() {
					apiCalled = true;
					apiCallArgs = arguments;
					defer = $q.defer();
					return defer.promise;
				});

				$scope.$apply(function() {
					boardFactory.getBoard();
				});
			}));

			it("is defined", function() {
				expect(boardFactory.createCategory).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof boardFactory.createCategory).toEqual("function");
			});

			it("calls serverAPI.createCategory", function() {
				apiCalled = false;
				boardFactory.createCategory();
				expect(apiCalled).toEqual(true);
			});

			it("calls serverAPI with args[boardid, catid]", function() {
				apiCallArgs = [];
				boardFactory.createCategory("categoryname");
				expect(apiCallArgs.length).toEqual(2);
				expect(apiCallArgs[0]).toEqual("boardid");
				expect(apiCallArgs[1]).toEqual("categoryname");
			});

			it("adds the category locally on resolve", function() {
				var categories = boardFactory.getBoardSync().categories;
				expect(categories.length).toEqual(1);
				expect(categories[0]._id).toEqual("categoryid");

				boardFactory.createCategory();
				$scope.$apply(function() {
					defer.resolve({
						_id: "newcategoryid"
					});
				});

				expect(categories.length).toEqual(2);
				expect(categories[0]._id).toEqual("categoryid");
				expect(categories[1]._id).toEqual("newcategoryid");
			});

			it("calls errorhandler on reject", function() {
				var called = false;

				spyOn(errorHandler, "handleHttpError").and.callFake(function() {
					called = true;
				});


				boardFactory.createCategory();
				$scope.$apply(function() {
					defer.reject();
				});

				expect(called).toEqual(true);
			});
		});


		describe("boardFactory.deleteCategory", function() {
			var apiCalled, apiCallArgs, defer;

			beforeEach(inject(function($q) {
				spyOn(serverAPI, "getBoard").and.callFake(function() {
					var def = $q.defer();

					def.resolve({
						_id: "boardid",
						admins: [],
						members: [],
						categories: [{
							_id: "categoryid",
							tasks: [{
								_id: "taskid",
								users: [],
								comments: []
							}]
						}]
					});

					return def.promise;
				});

				spyOn(serverAPI, "deleteCategory").and.callFake(function() {
					apiCalled = true;
					apiCallArgs = arguments;
					defer = $q.defer();
					return defer.promise;
				});

				$scope.$apply(function() {
					boardFactory.getBoard();
				});
			}));

			it("is defined", function() {
				expect(boardFactory.deleteCategory).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof boardFactory.deleteCategory).toEqual("function");
			});

			it("calls serverAPI.deleteCategory", function() {
				apiCalled = false;
				boardFactory.deleteCategory({});
				expect(apiCalled).toEqual(true);
			});

			it("calls serverAPI with args[boardid,catid]", function() {
				var board = boardFactory.getBoardSync();
				apiCallArgs = [];
				boardFactory.deleteCategory(board.categories[0]);
				expect(apiCallArgs.length).toEqual(2);
				expect(apiCallArgs[0]).toEqual("boardid");
				expect(apiCallArgs[1]).toEqual("categoryid");
			});

			it("deletes task locally on resolve", function() {
				var board = boardFactory.getBoardSync();
				expect(board.categories.length).toEqual(1);

				boardFactory.deleteCategory(board.categories[0]);
				$scope.$apply(function() {
					defer.resolve();
				});

				expect(board.categories.length).toEqual(0);
			});

			it("calls errorHandler on reject", function() {
				var called = false;
				spyOn(errorHandler, "handleHttpError").and.callFake(function() {
					called = true;
				});

				boardFactory.deleteCategory({});
				$scope.$apply(function() {
					defer.reject();
				});

				expect(called).toEqual(true);
			});
		});


		describe("boardFactory.deleteTask", function() {
			var apiCalled, apiCallArgs, defer;

			beforeEach(inject(function($q) {
				spyOn(serverAPI, "getBoard").and.callFake(function() {
					var def = $q.defer();

					def.resolve({
						_id: "boardid",
						admins: [],
						members: [],
						categories: [{
							_id: "categoryid",
							tasks: [{
								_id: "taskid",
								users: [],
								comments: []
							}]
						}]
					});

					return def.promise;
				});

				spyOn(serverAPI, "deleteTask").and.callFake(function() {
					apiCalled = true;
					apiCallArgs = arguments;
					defer = $q.defer();
					return defer.promise;
				});

				$scope.$apply(function() {
					boardFactory.getBoard();
				});
			}));

			it("is defined", function() {
				expect(boardFactory.deleteTask).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof boardFactory.deleteTask).toEqual("function");
			});

			it("calls serverAPI.createTask", function() {
				apiCalled = false;
				boardFactory.deleteTask({}, {});
				expect(apiCalled).toEqual(true);
			});

			it("calls serverAPI with args[boardid, catid, taskid]", function() {
				var board = boardFactory.getBoardSync();
				apiCallArgs = [];

				boardFactory.deleteTask(board.categories[0], board.categories[0].tasks[0]);
				expect(apiCallArgs.length).toEqual(3);
				expect(apiCallArgs[0]).toEqual("boardid");
				expect(apiCallArgs[1]).toEqual("categoryid");
				expect(apiCallArgs[2]).toEqual("taskid");
			});

			it("delete the task locally on resolve", function() {
				var board = boardFactory.getBoardSync();
				expect(board.categories[0].tasks.length).toEqual(1);

				boardFactory.deleteTask(board.categories[0], board.categories[0].tasks[0]);
				$scope.$apply(function() {
					defer.resolve();
				});

				expect(board.categories[0].tasks.length).toEqual(0);
			});

			it("calls errorHandler on reject", function() {
				var called = false;
				spyOn(errorHandler, "handleHttpError").and.callFake(function() {
					called = true;
				});

				boardFactory.deleteTask({}, {});
				$scope.$apply(function() {
					defer.reject();
				});

				expect(called).toEqual(true);
			});
		});
	});
})();
