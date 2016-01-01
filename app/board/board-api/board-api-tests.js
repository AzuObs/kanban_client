(function() {
	"use strict";

	describe("boardAPI", function() {
		var $rootScope, $httpBackend, boardAPI;

		beforeEach(function() {
			module("boardAPIModule");
			inject(function(_$rootScope_, _$httpBackend_, _boardAPI_) {
				$rootScope = _$rootScope_;
				$rootScope.endPoint = "app";
				$httpBackend = _$httpBackend_;
				boardAPI = _boardAPI_;
			});
		});

		///
		// TESTS
		// 

		describe("deleteBoard", function() {
			it("is defined", function() {
				expect(boardAPI.deleteBoard).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof boardAPI.deleteBoard).toEqual("function");
			});

			it("returns a promise", function() {
				var fn = function() {
					boardAPI.deleteBoard().then();
				};

				expect(fn).not.toThrow();
			});

			it("sends a http DELETE request", function() {
				var boardId;

				$httpBackend.expectDELETE("app/board/" + boardId).respond();

				$rootScope.$apply(function() {
					boardAPI.deleteBoard(boardId);
				});
			});
		});


		describe("createBoard", function() {
			it("is defined", function() {
				expect(boardAPI.createBoard).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof boardAPI.createBoard).toEqual("function");
			});

			it("returns a promise", function() {
				var fn = function() {
					boardAPI.createBoard().then();
				};

				expect(fn).not.toThrow();
			});

			it("sends a http POST request", function() {
				$httpBackend.expectPOST("app/board").respond();

				$rootScope.$apply(function() {
					boardAPI.createBoard();
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
					boardAPI.createBoard(userId, name);
				});
			});
		});


		describe("updateBoard", function() {
			it("is defined", function() {
				expect(boardAPI.updateBoard).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof boardAPI.updateBoard).toEqual("function");
			});

			it("returns a promise", function() {
				var fn = function() {
					boardAPI.updateBoard().then();
				};

				expect(fn).not.toThrow();
			});

			it("sends a http PUT request", function() {
				var boardId;
				boardId = "foo";

				$httpBackend.expectPUT("app/board").respond();

				$rootScope.$apply(function() {
					boardAPI.updateBoard(boardId);
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
					boardAPI.updateBoard(board);
				});
			});
		});


		describe("deleteTask", function() {
			it("is defined", function() {
				expect(boardAPI.deleteTask).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof boardAPI.deleteTask).toEqual("function");
			});

			it("returns a promise", function() {
				var fn = function() {
					boardAPI.deleteTask().then();
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
					boardAPI.deleteTask(boardId, catId, taskId);
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
				expect(boardAPI.createTask).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof boardAPI.createTask).toEqual("function");
			});

			it("returns a promise", function() {
				var fn = function() {
					boardAPI.createTask().then();
				};

				expect(fn).not.toThrow();
			});

			it("sends a http POST request", function() {


				$httpBackend.expectPOST("app/task/").respond();

				$rootScope.$apply(function() {
					boardAPI.createTask();
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
					boardAPI.createTask(boardId, categoryId, name, position);
				});
			});
		});


		describe("deleteCategory", function() {
			it("is defined", function() {
				expect(boardAPI.deleteCategory).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof boardAPI.deleteCategory).toEqual("function");
			});

			it("returns a promise", function() {
				var fn = function() {
					boardAPI.deleteCategory().then();
				};

				expect(fn).not.toThrow();
			});

			it("sends a http DELETE request", function() {
				var boardId, catId;
				boardId = "foo";
				catId = "bar";
				$httpBackend.expectDELETE("app/category/" + boardId + "/" + catId).respond(200);

				$rootScope.$apply(function() {
					boardAPI.deleteCategory(boardId, catId);
				});
			});
		});


		describe("createCategory", function() {
			it("is defined", function() {
				expect(boardAPI.createCategory).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof boardAPI.createCategory).toEqual("function");
			});

			it("returns a promise", function() {
				var fn = function() {
					boardAPI.createCategory().then();
				};

				expect(fn).not.toThrow();
			});

			it("sends a http POST request", function() {
				$httpBackend.expectPOST("app/category").respond(200);

				$rootScope.$apply(function() {
					boardAPI.createCategory();
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
					boardAPI.createCategory(body.boardId, body.name);
				});
			});
		});


		describe("getUser", function() {
			var userId = "foo";

			it("is defined", function() {
				expect(boardAPI.getUser).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof boardAPI.getUser).toEqual("function");
			});

			it("returns a promise", function() {
				var fn = function() {
					boardAPI.getUser(userId).then();
				};

				expect(fn).not.toThrow();
			});

			it("sends a http GET request", function() {
				$httpBackend
					.expectGET("app/user/" + userId)
					.respond(200);

				$rootScope.$apply(function() {
					boardAPI.getUser(userId);
				});
			});
		});


		describe("createComment", function() {
			it("is defined", function() {
				expect(boardAPI.createComment).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof boardAPI.createComment).toEqual("function");
			});

			it("returns a promise", function() {
				var fn = function() {
					boardAPI.createComment().then();
				};

				expect(fn).not.toThrow();
			});

			it("sends a http POST request", function() {
				$httpBackend.expectPOST("app/comment").respond(200);

				$rootScope.$apply(function() {
					boardAPI.createComment();
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
					boardAPI.createComment(body.content, body.username, body.userPicUrl, body.boardId, body.catId, body.taskId);
				});
			});
		});


		describe("getBoardsForUser", function() {
			var userId = "foo";

			it("is defined", function() {
				expect(boardAPI.getBoardsForUser).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof boardAPI.getBoardsForUser).toEqual("function");
			});

			it("returns a promise", function() {
				var fn = function() {
					boardAPI.getBoardsForUser(userId).then();
				};

				expect(fn).not.toThrow();
			});

			it("sends a http GET request", function() {
				$httpBackend
					.expectGET("app/board/user/" + userId)
					.respond(200);

				$rootScope.$apply(function() {
					boardAPI.getBoardsForUser(userId);
				});
			});
		});


		describe("getBoard", function() {
			var board;

			board = {
				_id: "foo"
			};

			it("is defined", function() {
				expect(boardAPI.getBoard).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof boardAPI.getBoard).toEqual("function");
			});

			it("returns a promise", function() {
				var fn = function() {
					boardAPI.getBoard(board._id).then();
				};

				expect(fn).not.toThrow();
			});

			it("sends a http GET request", function() {
				$httpBackend
					.expectGET("app/board/" + board._id)
					.respond(200);

				$rootScope.$apply(function() {
					boardAPI.getBoard(board._id);
				});
			});
		});


		describe("addMemberToBoard", function() {
			var board, userEmail;

			board = {
				_id: "foo"
			};

			userEmail = "foo";

			it("is defined", function() {
				expect(boardAPI.addMemberToBoard).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof boardAPI.addMemberToBoard).toEqual("function");
			});

			it("returns a promise", function() {
				var fn = function() {
					boardAPI.addMemberToBoard(board, userEmail).then();
				};

				expect(fn).not.toThrow();
			});

			it("sends a http PUT request", function() {
				$httpBackend
					.expectPUT("app/board/members")
					.respond(200);

				$rootScope.$apply(function() {
					boardAPI.addMemberToBoard(board, userEmail);
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
					boardAPI.addMemberToBoard(board, userEmail);
				});
			});
		});


		describe("removeUserFromBoard", function() {
			var board, user;

			board = {
				_id: "foo"
			};
			user = {
				_id: "bar"
			};

			it("is defined", function() {
				expect(boardAPI.removeUserFromBoard).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof boardAPI.removeUserFromBoard).toEqual("function");
			});

			it("returns a promise", function() {
				var fn = function() {
					boardAPI.removeUserFromBoard(board, user).then();
				};

				expect(fn).not.toThrow();
			});

			it("sends a http DELETE request", function() {
				$httpBackend
					.expectDELETE("app/board/" + board._id + "/user/" + user._id)
					.respond(200);

				$rootScope.$apply(function() {
					boardAPI.removeUserFromBoard(board, user);
				});
			});
		});
	});
})();
