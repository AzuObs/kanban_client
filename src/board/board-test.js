(function() {
	"use strict";

	describe("boardModule", function() {

		describe("USER_SELECTION_HEIGHT constant", function() {
			beforeEach(module("boardModule"));

			it("is defined", inject(function(USER_SELECTION_HEIGHT) {
				expect(USER_SELECTION_HEIGHT).toBeDefined();
			}));

			it("equals 150", inject(function(USER_SELECTION_HEIGHT) {
				expect(USER_SELECTION_HEIGHT).toEqual(150);
			}));
		});

		describe("boardCtrl", function() {
			var $scope, user, board;

			beforeEach(module("boardModule"));

			beforeEach(inject(function($controller, $rootScope) {
				user = {
					_id: "123",
					username: "foo"
				};

				board = {
					_id: "123",
					name: "foo",
					admins: ["foo"],
					members: ["bar"],
					categories: []
				};

				$scope = $rootScope.$new();
				$controller("boardCtrl", {
					$scope: $scope,
					user: user,
					board: board
				});
			}));

			describe("$scope.userSortOpts", function() {
				it("is defined", function() {
					expect($scope.userSortOpts).toBeDefined();
				});

				it("is an object", function() {
					expect(Object.prototype.toString.call($scope.userSortOpts)).toEqual("[object Object]");
				});

				it("has some configuration settings", function() {
					expect(Object.keys($scope.userSortOpts).length).toBeGreaterThan(0);
				});
			});

			describe("$scope.board.update()", function() {
				var argsAPI, deferAPI;

				beforeEach(inject(function(boardAPI, $q) {
					argsAPI = undefined;

					spyOn(boardAPI, "updateBoard").and.callFake(function() {
						deferAPI = $q.defer();
						argsAPI = arguments;
						return deferAPI.promise;
					});
				}));

				it("is defined", function() {
					expect($scope.board.update).toBeDefined();
				});

				it("is a function", function() {
					expect(typeof $scope.board.update).toEqual("function");
				});

				it("calls boardAPI.updateBoard with board as argument", function() {
					$scope.board.update();
					expect(argsAPI[0]).toEqual(board);
				});

				it("increments board version on resolve", function() {
					$scope.board._v = 0;
					$scope.board.update();
					$scope.$apply(function() {
						deferAPI.resolve();
					});

					expect($scope.board._v).toEqual(1);
				});

				it("logs an error on reject", inject(function($log) {
					var msg = "error";

					$log.reset();
					$scope.board.update();
					$scope.$apply(function() {
						deferAPI.reject(msg);
					});

					expect($log.error.logs[0][0]).toEqual(msg);
				}));
			});

			describe("$scope.users", function() {
				it("is defined", function() {
					expect($scope.users).toBeDefined();
				});

				it("is an array", function() {
					expect(Object.prototype.toString.call($scope.users)).toEqual("[object Array]");
				});

				it("equals admins + membes", function() {
					var users;

					users = board.admins.concat(board.members);
					expect($scope.users).toEqual(users);
				});
			});

			describe("$scope.user", function() {
				it("is defined", function() {
					expect($scope.user).toBeDefined();
				});

				it("is an object", function() {
					expect(Object.prototype.toString.call($scope.user)).toEqual("[object Object]");
				});

				it("equals the injected 'user' object", function() {
					expect($scope.user).toEqual(user);
				});
			});

			describe("$scope.board", function() {
				it("is defined", function() {
					expect($scope.board).toBeDefined();
				});

				it("is an object", function() {
					expect(Object.prototype.toString.call($scope.board)).toEqual("[object Object]");
				});

				it("equals the injected 'board' object", function() {
					expect($scope.board).toEqual(board);
				});
			});

			describe("$scope.showUserList", function() {
				it("is defined", function() {
					expect($scope.showUserList).toBeDefined();
				});

				it("is an boolean", function() {
					expect(typeof $scope.showUserList).toEqual("boolean");
				});

				it("equals false", function() {
					expect($scope.showUserList).toEqual(false);
				});
			});
		});

		describe("$stateProvider", function() {
			var stateArgs;

			beforeEach(function() {
				stateArgs = undefined;
				module("aboutModule", function($stateProvider) {
					spyOn($stateProvider, "state").and.callFake(function() {
						stateArgs = arguments;
					});
				});
				module("boardModule");
			});

			beforeEach(inject());

			it("calls state()", function() {
				expect(stateArgs).not.toEqual(undefined);
			});

			it("creates a new state 'kanban.board'", function() {
				expect(stateArgs[0]).toEqual("kanban.board");
			});

			it("sets the url to '/board/:boardname'", function() {
				expect(stateArgs[1].url).toEqual("/board/:boardName");
			});

			it("configures the views", function() {
				expect(Object.keys(stateArgs[1].views).length).toBeGreaterThan(0);
			});
		});

	});
})();
