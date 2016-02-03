(function() {
	"use strict";

	describe("serverAPI", function() {
		var $rootScope, $httpBackend, serverAPI;

		beforeEach(function() {
			module("serverAPIModule");
			inject(function(_$rootScope_, _$httpBackend_, _serverAPI_, ENV) {
				$rootScope = _$rootScope_;
				$rootScope.endPoint = ENV.apiEndpoint;
				$httpBackend = _$httpBackend_;
				serverAPI = _serverAPI_;
			});
		});


		describe("$httpProvider", function() {
			var $http, token;

			beforeEach(inject(function(_$http_) {
				$http = _$http_;
				delete sessionStorage.token;
				token = "123";
			}));

			it("sends the token on any request if token is present", function() {
				sessionStorage.token = token;

				$httpBackend.expectGET("http://foo.com", function(headers) {
					return headers.token === token;
				}).respond({
					foo: "foo"
				});

				$rootScope.$apply(function() {
					$http.get("http://foo.com").then(function() {}, function() {});
				});
			});

			it("doesn't send the token on any request if token is absent", function() {
				$httpBackend.expectGET("http://foo.com", function(headers) {
					return headers.token !== token;
				}).respond({
					foo: "foo"
				});

				$rootScope.$apply(function() {
					$http.get("http://foo.com").then(function() {}, function() {});
				});
			});
		});


		describe("serverAPI.getBoard()", function() {
			it("is defined", function() {
				expect(serverAPI.getBoard).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof serverAPI.getBoard).toEqual("function");
			});

			it("returns a promise", function() {
				expect(serverAPI.getBoard({}).then).not.toThrow();
			});

			it("sends a http GET request", function() {
				var boardId = "boardid";

				$httpBackend
					.expectGET($rootScope.endPoint + "/board/" + boardId)
					.respond();

				$rootScope.$apply(function() {
					serverAPI.getBoard(boardId);
				});
			});
		});


		describe("serverAPI.getUser()", function() {
			it("is defined", function() {
				expect(serverAPI.getUser).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof serverAPI.getUser).toEqual("function");
			});

			it("returns a promise", function() {
				expect(serverAPI.getUser({}).then).not.toThrow();
			});

			it("sends a http GET request", function() {
				var userId = "userid";

				$httpBackend
					.expectGET($rootScope.endPoint + "/user/" + userId)
					.respond();

				$rootScope.$apply(function() {
					serverAPI.getUser(userId);
				});
			});
		});


		describe("serverAPI.createBoard()", function() {
			it("is defined", function() {
				expect(serverAPI.createBoard).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof serverAPI.createBoard).toEqual("function");
			});

			it("returns a promise", function() {
				expect(serverAPI.createBoard().then).not.toThrow();
			});

			it("sends a http POST request", function() {
				$httpBackend.expectPOST($rootScope.endPoint + "/board").respond();

				$rootScope.$apply(function() {
					serverAPI.createBoard();
				});
			});

			it("posts a body", function() {
				var body = {
					userId: "userid",
					name: "name"
				};

				$httpBackend.expectPOST($rootScope.endPoint + "/board", JSON.stringify(body)).respond();

				$rootScope.$apply(function() {
					serverAPI.createBoard(body.userId, body.name);
				});
			});
		});


		describe("serverAPI.getUserBoards()", function() {
			it("is defined", function() {
				expect(serverAPI.getUserBoards).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof serverAPI.getUserBoards).toEqual("function");
			});

			it("returns a promise", function() {
				expect(serverAPI.getUserBoards({}).then).not.toThrow();
			});

			it("sends a http GET request", function() {
				var userId = "userid";

				$httpBackend
					.expectGET($rootScope.endPoint + "/board/user/" + userId)
					.respond();

				$rootScope.$apply(function() {
					serverAPI.getUserBoards(userId);
				});
			});
		});


		describe("serverAPI.deleteBoard()", function() {
			it("is defined", function() {
				expect(serverAPI.deleteBoard).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof serverAPI.deleteBoard).toEqual("function");
			});

			it("returns a promise", function() {
				expect(serverAPI.deleteBoard().then).not.toThrow();
			});

			it("sends a http DELETE request", function() {
				var boardId = "boardId";

				$httpBackend.expectDELETE($rootScope.endPoint + "/board/" + boardId).respond();

				$rootScope.$apply(function() {
					serverAPI.deleteBoard(boardId);
				});
			});
		});


		describe("serverAPI.addMemberToBoard()", function() {
			it("is defined", function() {
				expect(serverAPI.addMemberToBoard).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof serverAPI.addMemberToBoard).toEqual("function");
			});

			it("returns a promise", function() {
				expect(serverAPI.addMemberToBoard({}, {}).then).not.toThrow();
			});

			it("sends a http PUT request", function() {
				var board, userEmail;
				board = {};
				userEmail = "";

				$httpBackend
					.expectPUT($rootScope.endPoint + "/board/members")
					.respond();

				$rootScope.$apply(function() {
					serverAPI.addMemberToBoard(board, userEmail);
				});
			});

			it("puts the board ID and the user's email", function() {
				var body;
				body = {
					boardId: "boardid",
					userEmail: "useremail"
				};

				$httpBackend
					.expectPUT($rootScope.endPoint + "/board/members", JSON.stringify(body))
					.respond();

				$rootScope.$apply(function() {
					serverAPI.addMemberToBoard(body.boardId, body.userEmail);
				});
			});
		});


		describe("serverAPI.createComment()", function() {
			it("is defined", function() {
				expect(serverAPI.createComment).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof serverAPI.createComment).toEqual("function");
			});

			it("returns a promise", function() {
				expect(serverAPI.createComment().then).not.toThrow();
			});

			it("sends a http POST request", function() {
				$httpBackend.expectPOST($rootScope.endPoint + "/comment").respond();

				$rootScope.$apply(function() {
					serverAPI.createComment();
				});
			});

			it("posts a body", function() {
				var body;

				body = {
					content: "foo",
					username: "foo",
					userPicUrl: "foo",
					boardId: "foo",
					catId: "foo",
					taskId: "foo"
				};

				$httpBackend.expectPOST($rootScope.endPoint + "/comment", JSON.stringify(body))
					.respond();

				$rootScope.$apply(function() {
					serverAPI.createComment(body.content, body.username, body.userPicUrl, body.boardId, body.catId, body.taskId);
				});
			});
		});


		describe("serverAPI.createTask()", function() {
			it("is defined", function() {
				expect(serverAPI.createTask).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof serverAPI.createTask).toEqual("function");
			});

			it("returns a promise", function() {
				expect(serverAPI.createTask().then).not.toThrow();
			});

			it("sends a http POST request", function() {
				$httpBackend.expectPOST($rootScope.endPoint + "/task/").respond();

				$rootScope.$apply(function() {
					serverAPI.createTask();
				});
			});

			it("posts a body", function() {
				var body = {
					boardId: "boardid",
					categoryId: "categoryid",
					name: "name"
				};

				$httpBackend.expectPOST($rootScope.endPoint + "/task/", JSON.stringify(body)).respond();

				$rootScope.$apply(function() {
					serverAPI.createTask(body.name, body.categoryId, body.boardId);
				});
			});
		});


		describe("serverAPI.createCategory()", function() {
			it("is defined", function() {
				expect(serverAPI.createCategory).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof serverAPI.createCategory).toEqual("function");
			});

			it("returns a promise", function() {
				expect(serverAPI.createCategory().then).not.toThrow();
			});

			it("sends a http POST request", function() {
				$httpBackend.expectPOST($rootScope.endPoint + "/category").respond();

				$rootScope.$apply(function() {
					serverAPI.createCategory();
				});
			});

			it("posts a body", function() {
				var body = {
					boardId: "foo",
					name: "foo"
				};

				$httpBackend.expectPOST($rootScope.endPoint + "/category", JSON.stringify(body)).respond();

				$rootScope.$apply(function() {
					serverAPI.createCategory(body.boardId, body.name);
				});
			});
		});


		describe("serverAPI.deleteTask()", function() {
			it("is defined", function() {
				expect(serverAPI.deleteTask).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof serverAPI.deleteTask).toEqual("function");
			});

			it("returns a promise", function() {
				expect(serverAPI.deleteTask().then).not.toThrow();
			});

			it("sends a http DELETE request", function() {
				var body = {
					boardId: "boardid",
					catId: "catid",
					taskId: "taskid"
				};

				$httpBackend.expectDELETE(
					$rootScope.endPoint + "/task/" + body.boardId + "/" + body.catId + "/" + body.taskId
				).respond();

				$rootScope.$apply(function() {
					serverAPI.deleteTask(body.boardId, body.catId, body.taskId);
				});
			});
		});


		describe("serverAPI.deleteCategory()", function() {
			it("is defined", function() {
				expect(serverAPI.deleteCategory).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof serverAPI.deleteCategory).toEqual("function");
			});

			it("returns a promise", function() {
				expect(serverAPI.deleteCategory().then).not.toThrow();
			});

			it("sends a http DELETE request", function() {
				var body = {
					boardId: "boardid",
					catId: "catid"
				};

				$httpBackend.expectDELETE(
					$rootScope.endPoint + "/category/" + body.boardId + "/" + body.catId
				).respond();

				$rootScope.$apply(function() {
					serverAPI.deleteCategory(body.boardId, body.catId);
				});
			});
		});


		describe("serverAPI.updateBoard()", function() {
			it("is defined", function() {
				expect(serverAPI.updateBoard).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof serverAPI.updateBoard).toEqual("function");
			});

			it("returns a promise", function() {
				expect(serverAPI.updateBoard().then).not.toThrow();
			});

			it("sends a http PUT request", function() {
				$httpBackend.expectPUT($rootScope.endPoint + "/board").respond();

				$rootScope.$apply(function() {
					serverAPI.updateBoard();
				});
			});

			it("posts a body", function() {
				var body = {
					board: {
						_id: "foo",
						content: "foo"
					}
				};

				$httpBackend.expectPUT($rootScope.endPoint + "/board", JSON.stringify(body)).respond();

				$rootScope.$apply(function() {
					serverAPI.updateBoard(body.board);
				});
			});
		});


		describe("serverAPI.createUser()", function() {
			it("is defined", function() {
				expect(serverAPI.createUser).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof serverAPI.createUser).toEqual("function");
			});

			it("send a POST request", function() {
				$httpBackend.expectPOST($rootScope.endPoint + "/user").respond();

				$rootScope.$apply(function() {
					serverAPI.createUser();
				});
			});

			it("send a body", function() {
				var body = {
					username: "username",
					pwd: "pwd"
				};

				$httpBackend.expectPOST($rootScope.endPoint + "/user", JSON.stringify(body)).respond();
				$rootScope.$apply(function() {
					serverAPI.createUser(body.username, body.pwd);
				});
			});
		});


		describe("serverAPI.authenticate()", function() {
			it("is defined", function() {
				expect(serverAPI.authenticate).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof serverAPI.authenticate).toEqual("function");
			});

			it("send a POST request", function() {
				$httpBackend.expectPOST($rootScope.endPoint + "/user/login").respond();

				$rootScope.$apply(function() {
					serverAPI.authenticate();
				});
			});

			it("send a body", function() {
				var body = {
					username: "username",
					pwd: "pwd"
				};

				$httpBackend.expectPOST($rootScope.endPoint + "/user/login", JSON.stringify(body)).respond();
				$rootScope.$apply(function() {
					serverAPI.authenticate(body.username, body.pwd);
				});
			});
		});
	});
})();
