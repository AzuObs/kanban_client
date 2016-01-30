(function() {
	"use strict";

	describe("boardListModule", function() {
		describe("boardListCtrl", function() {
			var $scope, user, boards;

			beforeEach(function() {
				module("boardListModule");
				inject(function($controller, $rootScope) {
					$scope = $rootScope.$new();
					boards = ["foo"];
					user = {
						_id: "123"
					};

					$controller("boardListCtrl", {
						$scope: $scope,
						user: user,
						boards: boards
					});
				});
			});


			describe("$scope.user", function() {
				it("exists", function() {
					expect($scope.user).toBeDefined();
				});

				it("is an object", function() {
					expect(Object.prototype.toString.call($scope.user)).toEqual("[object Object]");
				});

				it("is equal to the user injected into the controller", function() {
					expect($scope.user).toEqual(user);
				});
			});


			describe("$scope.boards", function() {
				it("exists", function() {
					expect($scope.boards).toBeDefined();
				});

				it("is an array", function() {
					expect(Object.prototype.toString.call($scope.boards)).toEqual("[object Array]");
				});

				it("is equal to the boards injected into the controller", function() {
					expect($scope.boards).toEqual(boards);
				});
			});


			describe("$scope.newBoardName", function() {
				it("exist", function() {
					expect($scope.newBoardName).toBeDefined();
				});

				it("is a string", function() {
					expect(typeof $scope.newBoardName).toEqual("string");
				});

				it("is empty", function() {
					expect($scope.newBoardName.length).toEqual(0);
				});
			});


			describe("$scope.createBoard()", function() {
				var apiCalled, apiCallArgs;

				beforeEach(inject(function(userFactory) {
					spyOn(userFactory, "createBoard").and.callFake(function() {
						apiCalled = true;
						apiCallArgs = arguments;
					});
				}));

				it("exists", function() {
					expect($scope.createBoard).toBeDefined();
				});

				it("is a function", function() {
					expect(typeof $scope.createBoard).toEqual("function");
				});

				it("calls userFactory.createBoard", function() {
					apiCalled = undefined;
					var e = {
						type: "click"
					};
					$scope.createBoard(e);
					expect(apiCalled).toEqual(true);
				});

				it("calls userFactory.createBoard with args [$scope.newBoardName]", function() {
					$scope.newBoardName = "foobar";
					var e = {
						type: "click"
					};
					$scope.createBoard(e);
					expect(apiCallArgs[0]).toEqual($scope.newBoardName);
				});
			});


			describe("$scope.openBoardModal()", function() {
				var modalWasCalled;

				beforeEach(inject(function($modal) {
					modalWasCalled = undefined;
					spyOn($modal, "open").and.callFake(function() {
						modalWasCalled = true;
					});
				}));

				it("exists", function() {
					expect($scope.openBoardModal).toBeDefined();
				});

				it("is a function", function() {
					expect(typeof $scope.openBoardModal).toEqual("function");
				});

				it("calls $modal.open()", function() {
					$scope.openBoardModal();
					expect(modalWasCalled).toEqual(true);
				});
			});


			describe("$scope.goToBoard()", function() {
				var stateArgs, board;

				beforeEach(inject(function($state) {
					board = {
						boardname: "foo",
						_id: "bar"
					};
					stateArgs = undefined;
					spyOn($state, "go").and.callFake(function() {
						stateArgs = arguments;
					});
				}));

				it("is defined", function() {
					expect($scope.goToBoard).toBeDefined();
				});

				it("is a function", function() {
					expect(typeof $scope.goToBoard).toEqual("function");
				});

				it("goes to state 'kanban.board' with /:boardname", function() {
					$scope.goToBoard(board);
					expect(stateArgs[0]).toEqual("kanban.board");
					expect(stateArgs[1].boardName).toEqual(board.boardName);
				});

				it("stores the boardId in sessionStorage", function() {
					delete sessionStorage.boardId;
					$scope.goToBoard(board);
					expect(sessionStorage.boardId).toEqual("bar");
				});
			});
		});
	});
})();
