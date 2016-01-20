(function() {
	"use strict";

	describe("boardListModule", function() {
		describe("$stateProvider", function() {
			var stateArgs;

			// the following is a hack
			// in order to test the config phase of my target module 
			// I need to set the spies up before .config has been executed			
			beforeEach(function() {
				module("aboutModule", function($stateProvider) {
					spyOn($stateProvider, "state").and.callFake(function() {
						stateArgs = arguments;
					});
				});
				module("boardListModule");
			});

			beforeEach(inject());

			it("sets the state to kanban.boardList", function() {
				expect(stateArgs[0]).toEqual("kanban.boardList");
			});

			it("sets the url to '/user/:username", function() {
				expect(stateArgs[1].url).toEqual("/user/:username");
			});

			it("sets the view", function() {
				expect(stateArgs[1].views).toBeDefined();
				expect(Object.keys(stateArgs[1].views).length).not.toEqual(0);
			});
		});

		describe("boardListCtrl", function() {
			var $scope, user, boards;

			beforeEach(module("boardListModule"));
			beforeEach(inject(function($controller, $rootScope) {
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
			}));

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

			describe("$scope.boardName", function() {
				it("exist", function() {
					expect($scope.boardName).toBeDefined();
				});

				it("is a string", function() {
					expect(typeof $scope.boardName).toEqual("string");
				});

				it("is empty", function() {
					expect($scope.boardName.length).toEqual(0);
				});
			});

			describe("$scope.createBoard()", function() {
				var $log, createBoardArgs, createBoardDefer;

				beforeEach(inject(function(_$log_, serverAPI, $q) {
					$log = _$log_;

					createBoardArgs = undefined;
					spyOn(serverAPI, "createBoard").and.callFake(function() {
						createBoardDefer = $q.defer();
						createBoardArgs = arguments;
						return createBoardDefer.promise;
					});
				}));

				it("exists", function() {
					expect($scope.createBoard).toBeDefined();
				});

				it("is a function", function() {
					expect(typeof $scope.createBoard).toEqual("function");
				});

				it("calls to serverAPI.createBoard with {userid, boardname}", function() {
					$scope.boardName = "foo";
					$scope.createBoard();
					expect(createBoardArgs[0]).toEqual($scope.user._id);
					expect(createBoardArgs[1]).toEqual($scope.boardName);
				});

				it("adds a new board to $scope.boards on resolve", function() {
					var board = "foo";
					$scope.boards = [];

					$scope.createBoard();
					$scope.$apply(function() {
						createBoardDefer.resolve(board);
					});

					expect($scope.boards).toEqual([board]);
				});

				it("logs an error msg on reject", function() {
					$log.reset();
					var res = "foo";

					$scope.createBoard();
					$scope.$apply(function() {
						createBoardDefer.reject(res);
					});

					expect($log.error.logs[0]).toEqual([res]);
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
