(function() {
	"use strict";

	describe("userFactory", function() {
		var userFactory, $rootScope;

		beforeEach(module("userFactoryModule"));
		beforeEach(inject(function(_userFactory_, _$rootScope_) {
			userFactory = _userFactory_;
			$rootScope = _$rootScope_;
		}));


		describe("userFactory.getUser()", function() {
			var apiCalled, apiCallArgs, defer;

			beforeEach(inject(function(serverAPI, $q) {
				spyOn(serverAPI, "getUser").and.callFake(function() {
					apiCalled = true;
					apiCallArgs = arguments;
					defer = $q.defer();
					return defer.promise;
				});
			}));

			it("is defined", function() {
				expect(userFactory.getUser).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof userFactory.getUser).toEqual("function");
			});

			it("returns a promise", function() {
				expect(userFactory.getUser().then).not.toThrow();
			});

			it("calls serverAPI.getUser()", function() {
				apiCalled = false;
				userFactory.getUser();
				expect(apiCalled).toEqual(true);
			});

			it("call serverAPI with args[userid]", function() {
				apiCallArgs = [];
				userFactory.getUser("userid");
				expect(apiCallArgs.length).toEqual(1);
				expect(apiCallArgs[0]).toEqual("userid");
			});

			it("calls errorHandler on reject", inject(function(errorHandler) {
				var called = false;
				spyOn(errorHandler, "handleHttpError").and.callFake(function() {
					called = true;
				});

				userFactory.getUser();
				$rootScope.$apply(function() {
					defer.reject();
				});

				expect(called).toEqual(true);
			}));
		});


		describe("userFactory.getUserBoards()", function() {
			var apiCalled, apiCallArgs, defer;

			beforeEach(inject(function(serverAPI, $q) {
				spyOn(serverAPI, "getUserBoards").and.callFake(function() {
					apiCalled = true;
					apiCallArgs = arguments;
					defer = $q.defer();
					return defer.promise;
				});
			}));

			it("is defined", function() {
				expect(userFactory.getUserBoards).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof userFactory.getUserBoards).toEqual("function");
			});

			it("returns a promise", function() {
				expect(userFactory.getUserBoards().then).not.toThrow();
			});

			it("calls serverAPI.getUserBoards()", function() {
				apiCalled = false;
				userFactory.getUserBoards();
				expect(apiCalled).toEqual(true);
			});

			it("call serverAPI with args[userid]", function() {
				apiCallArgs = [];
				userFactory.getUserBoards("userid");
				expect(apiCallArgs.length).toEqual(1);
				expect(apiCallArgs[0]).toEqual("userid");
			});

			it("calls errorHandler on reject", inject(function(errorHandler) {
				var called = false;
				spyOn(errorHandler, "handleHttpError").and.callFake(function() {
					called = true;
				});

				userFactory.getUserBoards();
				$rootScope.$apply(function() {
					defer.reject();
				});

				expect(called).toEqual(true);
			}));
		});


		describe("userFactory.createUser()", function() {
			var apiCalled, apiCallArgs, defer;

			beforeEach(inject(function(serverAPI, $q) {
				spyOn(serverAPI, "createUser").and.callFake(function() {
					apiCalled = true;
					apiCallArgs = arguments;
					defer = $q.defer();
					return defer.promise;
				});
			}));

			it("is defined", function() {
				expect(userFactory.createUser).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof userFactory.createUser).toEqual("function");
			});

			it("returns a promise", function() {
				expect(userFactory.createUser().then).not.toThrow();
			});

			it("calls serverAPI.createUser()", function() {
				apiCalled = false;
				userFactory.createUser();
				expect(apiCalled).toEqual(true);
			});

			it("call serverAPI with args[username, pwd]", function() {
				apiCallArgs = [];
				userFactory.createUser("username", "pwd");
				expect(apiCallArgs.length).toEqual(2);
				expect(apiCallArgs[0]).toEqual("username");
				expect(apiCallArgs[1]).toEqual("pwd");
			});

			it("calls userFactory.onSuccessfulLoginSync() on resolve", function() {
				var called = false;
				spyOn(userFactory, "onSuccessfulLoginSync").and.callFake(function() {
					called = true;
				});

				userFactory.createUser();
				$rootScope.$apply(function() {
					defer.resolve();
				});

				expect(called).toEqual(true);
			});

			it("calls errorHandler on reject", inject(function(errorHandler) {
				var called = false;
				spyOn(errorHandler, "handleHttpError").and.callFake(function() {
					called = true;
				});

				userFactory.createUser();
				$rootScope.$apply(function() {
					defer.reject();
				});

				expect(called).toEqual(true);
			}));
		});


		describe("userFactory.createBoard()", function() {
			var apiCalled, apiCallArgs, defer;

			beforeEach(inject(function(serverAPI, $q) {
				spyOn(serverAPI, "createBoard").and.callFake(function() {
					apiCalled = true;
					apiCallArgs = arguments;
					defer = $q.defer();
					return defer.promise;
				});

				spyOn(serverAPI, "getUser").and.callFake(function() {
					var defer = $q.defer();
					defer.resolve({
						_id: "userid"
					});
					return defer.promise;
				});
				spyOn(serverAPI, "getUserBoards").and.callFake(function() {
					var defer = $q.defer();
					defer.resolve([]);
					return defer.promise;
				});
				$rootScope.$apply(function() {
					userFactory.getUser();
					userFactory.getUserBoards();
				});
			}));

			it("is defined", function() {
				expect(userFactory.createBoard).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof userFactory.createBoard).toEqual("function");
			});

			it("returns a promise", function() {
				expect(userFactory.createBoard().then).not.toThrow();
			});

			it("calls serverAPI.createBoard()", function() {
				apiCalled = false;
				userFactory.createBoard();
				expect(apiCalled).toEqual(true);
			});

			it("call serverAPI with args[boardname]", function() {
				apiCallArgs = [];
				userFactory.createBoard("boardname");
				expect(apiCallArgs.length).toEqual(2);
				expect(apiCallArgs[0]).toEqual("userid");
				expect(apiCallArgs[1]).toEqual("boardname");
			});


			it("calls errorHandler on reject", inject(function(errorHandler) {
				var called = false;
				spyOn(errorHandler, "handleHttpError").and.callFake(function() {
					called = true;
				});

				userFactory.createBoard();
				$rootScope.$apply(function() {
					defer.reject();
				});

				expect(called).toEqual(true);
			}));
		});


		describe("userFactory.deleteBoard()", function() {
			var apiCalled, apiCallArgs, defer;

			beforeEach(inject(function(serverAPI, $q) {
				spyOn(serverAPI, "deleteBoard").and.callFake(function() {
					apiCalled = true;
					apiCallArgs = arguments;
					defer = $q.defer();
					return defer.promise;
				});
			}));

			it("is defined", function() {
				expect(userFactory.deleteBoard).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof userFactory.deleteBoard).toEqual("function");
			});

			it("returns a promise", function() {
				expect(userFactory.deleteBoard().then).not.toThrow();
			});

			it("calls serverAPI.deleteBoard()", function() {
				apiCalled = false;
				userFactory.deleteBoard();
				expect(apiCalled).toEqual(true);
			});

			it("call serverAPI with args[boardid]", function() {
				apiCallArgs = [];
				userFactory.deleteBoard("boardid");
				expect(apiCallArgs.length).toEqual(1);
				expect(apiCallArgs[0]).toEqual("boardid");
			});


			it("calls errorHandler on reject", inject(function(errorHandler) {
				var called = false;
				spyOn(errorHandler, "handleHttpError").and.callFake(function() {
					called = true;
				});

				userFactory.deleteBoard();
				$rootScope.$apply(function() {
					defer.reject();
				});

				expect(called).toEqual(true);
			}));
		});


		describe("userFactory.authenticate()", function() {
			var apiCalled, apiCallArgs, defer;

			beforeEach(inject(function(serverAPI, $q) {
				spyOn(serverAPI, "authenticate").and.callFake(function() {
					apiCalled = true;
					apiCallArgs = arguments;
					defer = $q.defer();
					return defer.promise;
				});
			}));

			it("is defined", function() {
				expect(userFactory.authenticate).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof userFactory.authenticate).toEqual("function");
			});

			it("returns a promise", function() {
				expect(userFactory.authenticate().then).not.toThrow();
			});

			it("calls serverAPI.authenticate()", function() {
				apiCalled = false;
				userFactory.authenticate();
				expect(apiCalled).toEqual(true);
			});

			it("call serverAPI with args[username, pwd]", function() {
				apiCallArgs = [];
				userFactory.authenticate("username", "pwd");
				expect(apiCallArgs.length).toEqual(2);
				expect(apiCallArgs[0]).toEqual("username");
				expect(apiCallArgs[1]).toEqual("pwd");
			});

			it("calls userFactory.onSuccessfulLoginSync() on resolve", function() {
				var called = false;
				spyOn(userFactory, "onSuccessfulLoginSync").and.callFake(function() {
					called = true;
				});

				userFactory.authenticate();
				$rootScope.$apply(function() {
					defer.resolve();
				});

				expect(called).toEqual(true);
			});

			it("calls errorHandler on reject", inject(function(errorHandler) {
				var called = false;
				spyOn(errorHandler, "handleHttpError").and.callFake(function() {
					called = true;
				});

				userFactory.authenticate();
				$rootScope.$apply(function() {
					defer.reject();
				});

				expect(called).toEqual(true);
			}));
		});


		describe("userFactory.onSuccessfulLoginSync()", function() {
			var apiCalled, apiCallArgs;

			beforeEach(inject(function($state) {
				spyOn($state, "go").and.callFake(function() {
					apiCalled = true;
					apiCallArgs = arguments;
				});
			}));

			it("is defined", function() {
				expect(userFactory.onSuccessfulLoginSync).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof userFactory.onSuccessfulLoginSync).toEqual("function");
			});

			it("stores userId in sessionStorage", function() {
				sessionStorage.userId = undefined;
				userFactory.onSuccessfulLoginSync({
					user: {
						_id: "userid"
					},
					token: "token"
				});
				expect(sessionStorage.userId).toEqual("userid");
			});

			it("stores token in sessionStorage", function() {
				sessionStorage.token = undefined;
				userFactory.onSuccessfulLoginSync({
					user: {
						_id: "userid"
					},
					token: "token"
				});
				expect(sessionStorage.token).toEqual("token");
			});

			it("calls $state.go", function() {
				apiCalled = false;
				userFactory.onSuccessfulLoginSync({
					user: {}
				});
				expect(apiCalled).toEqual(true);
			});

			it("calls $state with args ['kanban.boardList', username]", function() {
				apiCallArgs = [];
				userFactory.onSuccessfulLoginSync({
					user: {
						username: "username"
					}
				});
				expect(apiCallArgs.length).toEqual(2);
				expect(apiCallArgs[0]).toEqual("kanban.boardList");
				expect(apiCallArgs[1].username).toEqual("username");
			});
		});

	});
})();
