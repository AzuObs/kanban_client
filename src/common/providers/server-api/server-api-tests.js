(function() {
	"use strict";

	describe("serverAPI", function() {
		var $rootScope, $httpBackend, serverAPI;

		beforeEach(function() {
			module("serverAPIModule");
			inject(function(_$rootScope_, _$httpBackend_, _serverAPI_) {
				$rootScope = _$rootScope_;
				$rootScope.endPoint = "app";
				$httpBackend = _$httpBackend_;
				serverAPI = _serverAPI_;
			});
		});

		///
		// TESTS
		// 

		describe("$httpProvider", function() {
			var token;

			beforeEach(function() {
				delete sessionStorage.token;
				token = "123";
			});

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

		describe("deleteBoard", function() {
			it("is defined", function() {
				expect(serverAPI.deleteBoard).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof serverAPI.deleteBoard).toEqual("function");
			});

			it("returns a promise", function() {
				var fn = function() {
					serverAPI.deleteBoard().then();
				};

				expect(fn).not.toThrow();
			});

			it("sends a http DELETE request", function() {
				var boardId;

				$httpBackend.expectDELETE("app/board/" + boardId).respond();

				$rootScope.$apply(function() {
					serverAPI.deleteBoard(boardId);
				});
			});
		});

		describe("createBoard", function() {
			it("is defined", function() {
				expect(serverAPI.createBoard).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof serverAPI.createBoard).toEqual("function");
			});

			it("returns a promise", function() {
				var fn = function() {
					serverAPI.createBoard().then();
				};

				expect(fn).not.toThrow();
			});

			it("sends a http POST request", function() {
				$httpBackend.expectPOST("app/board").respond();

				$rootScope.$apply(function() {
					serverAPI.createBoard();
				});
			});

			it("posts a body", function() {
				var body, userId, name;
				userId = "foo";
				name = "bar";
				body = {
					userId: userId,
					name: name
				};

				$httpBackend.expectPOST("app/board", JSON.stringify(body)).respond();

				$rootScope.$apply(function() {
					serverAPI.createBoard(userId, name);
				});
			});
		});

		describe("updateBoard", function() {
			it("is defined", function() {
				expect(serverAPI.updateBoard).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof serverAPI.updateBoard).toEqual("function");
			});

			it("returns a promise", function() {
				var fn = function() {
					serverAPI.updateBoard().then();
				};

				expect(fn).not.toThrow();
			});

			it("sends a http PUT request", function() {
				var boardId;
				boardId = "foo";

				$httpBackend.expectPUT("app/board").respond();

				$rootScope.$apply(function() {
					serverAPI.updateBoard(boardId);
				});
			});

			it("posts a body", function() {
				var board, body;
				board = {
					_id: "foo",
					content: "foo"
				};

				body = {
					board: board
				};

				$httpBackend.expectPUT("app/board", JSON.stringify(body)).respond();

				$rootScope.$apply(function() {
					serverAPI.updateBoard(board);
				});
			});
		});

		describe("deleteTask", function() {
			it("is defined", function() {
				expect(serverAPI.deleteTask).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof serverAPI.deleteTask).toEqual("function");
			});

			it("returns a promise", function() {
				var fn = function() {
					serverAPI.deleteTask().then();
				};

				expect(fn).not.toThrow();
			});

			it("sends a http DELETE request", function() {
				var boardId, catId, taskId;
				boardId = "foo";
				catId = "bar";
				taskId = "foobar";

				$httpBackend.expectDELETE("app/task/" + boardId + "/" + catId + "/" + taskId).respond();

				$rootScope.$apply(function() {
					serverAPI.deleteTask(boardId, catId, taskId);
				});
			});
		});

		describe("createTask", function() {
			var boardId, categoryId, name, position;

			boardId = "foo";
			categoryId = "bar";
			name = "foobar";
			position = 1;

			it("is defined", function() {
				expect(serverAPI.createTask).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof serverAPI.createTask).toEqual("function");
			});

			it("returns a promise", function() {
				var fn = function() {
					serverAPI.createTask().then();
				};

				expect(fn).not.toThrow();
			});

			it("sends a http POST request", function() {

				$httpBackend.expectPOST("app/task/").respond();

				$rootScope.$apply(function() {
					serverAPI.createTask();
				});
			});

			it("posts a body", function() {
				var body = {
					boardId: boardId,
					categoryId: categoryId,
					name: name,
					position: position
				};

				$httpBackend.expectPOST("app/task/", JSON.stringify(body)).respond();

				$rootScope.$apply(function() {
					serverAPI.createTask(boardId, categoryId, name, position);
				});
			});
		});

		describe("deleteCategory", function() {
			it("is defined", function() {
				expect(serverAPI.deleteCategory).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof serverAPI.deleteCategory).toEqual("function");
			});

			it("returns a promise", function() {
				var fn = function() {
					serverAPI.deleteCategory().then();
				};

				expect(fn).not.toThrow();
			});

			it("sends a http DELETE request", function() {
				var boardId, catId;
				boardId = "foo";
				catId = "bar";
				$httpBackend.expectDELETE("app/category/" + boardId + "/" + catId).respond(200);

				$rootScope.$apply(function() {
					serverAPI.deleteCategory(boardId, catId);
				});
			});
		});

		describe("createCategory", function() {
			it("is defined", function() {
				expect(serverAPI.createCategory).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof serverAPI.createCategory).toEqual("function");
			});

			it("returns a promise", function() {
				var fn = function() {
					serverAPI.createCategory().then();
				};

				expect(fn).not.toThrow();
			});

			it("sends a http POST request", function() {
				$httpBackend.expectPOST("app/category").respond(200);

				$rootScope.$apply(function() {
					serverAPI.createCategory();
				});
			});

			it("posts a body", function() {
				var body;

				body = {
					boardId: "foo",
					name: "foo"
				};

				$httpBackend.expectPOST("app/category", JSON.stringify(body)).respond();

				$rootScope.$apply(function() {
					serverAPI.createCategory(body.boardId, body.name);
				});
			});
		});

		describe("getUser", function() {
			var userId = "foo";

			it("is defined", function() {
				expect(serverAPI.getUser).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof serverAPI.getUser).toEqual("function");
			});

			it("returns a promise", function() {
				var fn = function() {
					serverAPI.getUser(userId).then();
				};

				expect(fn).not.toThrow();
			});

			it("sends a http GET request", function() {
				$httpBackend
					.expectGET("app/user/" + userId)
					.respond(200);

				$rootScope.$apply(function() {
					serverAPI.getUser(userId);
				});
			});
		});

		describe("createComment", function() {
			it("is defined", function() {
				expect(serverAPI.createComment).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof serverAPI.createComment).toEqual("function");
			});

			it("returns a promise", function() {
				var fn = function() {
					serverAPI.createComment().then();
				};

				expect(fn).not.toThrow();
			});

			it("sends a http POST request", function() {
				$httpBackend.expectPOST("app/comment").respond(200);

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

				$httpBackend.expectPOST("app/comment", JSON.stringify(body)).respond();

				$rootScope.$apply(function() {
					serverAPI.createComment(body.content, body.username, body.userPicUrl, body.boardId, body.catId, body.taskId);
				});
			});
		});

		describe("getUserBoards", function() {
			var userId = "foo";

			it("is defined", function() {
				expect(serverAPI.getUserBoards).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof serverAPI.getUserBoards).toEqual("function");
			});

			it("returns a promise", function() {
				var fn = function() {
					serverAPI.getUserBoards(userId).then();
				};

				expect(fn).not.toThrow();
			});

			it("sends a http GET request", function() {
				$httpBackend
					.expectGET("app/board/user/" + userId)
					.respond(200);

				$rootScope.$apply(function() {
					serverAPI.getUserBoards(userId);
				});
			});
		});

		describe("getBoard", function() {
			var board;

			board = {
				_id: "foo"
			};

			it("is defined", function() {
				expect(serverAPI.getBoard).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof serverAPI.getBoard).toEqual("function");
			});

			it("returns a promise", function() {
				var fn = function() {
					serverAPI.getBoard(board._id).then();
				};

				expect(fn).not.toThrow();
			});

			it("sends a http GET request", function() {
				$httpBackend
					.expectGET("app/board/" + board._id)
					.respond(200);

				$rootScope.$apply(function() {
					serverAPI.getBoard(board._id);
				});
			});
		});

		describe("addMemberToUserSelection", function() {
			var board, userEmail;

			board = {
				_id: "foo"
			};

			userEmail = "foo";

			it("is defined", function() {
				expect(serverAPI.addMemberToUserSelection).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof serverAPI.addMemberToUserSelection).toEqual("function");
			});

			it("returns a promise", function() {
				var fn = function() {
					serverAPI.addMemberToUserSelection(board, userEmail).then();
				};

				expect(fn).not.toThrow();
			});

			it("sends a http PUT request", function() {
				$httpBackend
					.expectPUT("app/board/members")
					.respond(200);

				$rootScope.$apply(function() {
					serverAPI.addMemberToUserSelection(board, userEmail);
				});
			});

			it("puts the board ID and the user's email", function() {
				var expectedBody;

				expectedBody = JSON.stringify({
					boardId: board._id,
					userEmail: userEmail
				});

				$httpBackend
					.expectPUT("app/board/members", expectedBody)
					.respond(200);

				$rootScope.$apply(function() {
					serverAPI.addMemberToUserSelection(board, userEmail);
				});
			});
		});
	});
})();
