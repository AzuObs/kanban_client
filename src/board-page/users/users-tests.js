(function() {
	"use strict";

	describe("userMenuCtrl", function() {
		var $scope, getBoardUsersSyncCalled;

		beforeEach(function() {
			module("userMenuModule");
			inject(function($controller, $rootScope, boardFactory) {
				spyOn(boardFactory, "getBoardSync").and.callFake(function() {
					return {
						members: [],
						admins: [],
						name: "my board"
					};
				});

				spyOn(boardFactory, "getBoardUsersSync").and.callFake(function() {
					getBoardUsersSyncCalled = true;
					return [];
				});

				$scope = $rootScope.$new();
				$controller("userMenuCtrl", {
					$scope: $scope
				});
			});
		});


		describe("$scope.addMember()", function() {
			var apiCallArgs, apiCalled, defer;

			beforeEach(inject(function(boardFactory, $q) {
				spyOn(boardFactory, "addMemberToBoard").and.callFake(function() {
					apiCalled = true;
					apiCallArgs = arguments;
					defer = $q.defer();
					return defer.promise;
				});
			}));

			it("is defined", function() {
				expect($scope.addMember).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.addMember).toEqual("function");
			});

			it("calls boardFactory.addMemberToBoard", function() {
				apiCalled = false;
				$scope.addMember();
				expect(apiCalled).toEqual(true);
			});

			it("calls boardFactory.addMemberToBoard with args [addMemberInput]",
				function() {
					apiCallArgs = [];

					$scope.addMember();
					expect(apiCallArgs.length).toEqual(1);
					expect(apiCallArgs[0]).toEqual($scope.addMemberInput);
				});


			it("calls $scope.clearAddMemberInput", function() {
				var called = false;

				spyOn($scope, "clearAddMemberInput").and.callFake(function() {
					called = true;
				});

				$scope.addMember();
				expect(called).toEqual(true);
			});
		});


		describe("$scope.clearAddMemberInput()", function() {
			it("is defined", function() {
				expect($scope.clearAddMemberInput).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.clearAddMemberInput).toEqual("function");
			});

			it("clears $scope.addMemberInput", function() {
				$scope.addMemberInput = "foobar";
				$scope.clearAddMemberInput();
				expect($scope.addMemberInput).toEqual("");
			});
		});


		describe("$scope.openUserModal()", function() {
			var apiCalled;

			beforeEach(inject(function($modal) {
				spyOn($modal, "open").and.callFake(function() {
					apiCalled = true;
				});
			}));

			it("is defined", function() {
				expect($scope.openUserModal).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.openUserModal).toEqual("function");
			});

			it("opens a modal", function() {
				apiCalled = false;
				$scope.openUserModal();
				expect(apiCalled).toEqual(true);
			});
		});


		describe("$scope.setAddMember()", function() {
			it("is defined", function() {
				expect($scope.setAddMember).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.setAddMember).toEqual("function");
			});

			it("sets $scope.addMemberInput to it's function argument", function() {
				$scope.addMemberInput = "";
				$scope.setAddMember("foo");
				expect($scope.addMemberInput).toEqual("foo");
			});
		});


		describe("$scope.stopSort()", function() {
			//  var getBoardUsersSyncCalled is defined at the top of the document
			//  under describe("userCtrl")

			it("is defined", function() {
				expect($scope.stopSort).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.stopSort).toEqual("function");
			});

			it("calls boardFactory.getBoardUsersSync", function() {
				getBoardUsersSyncCalled = false;
				$scope.stopSort();
				expect(getBoardUsersSyncCalled).toEqual(true);
			});
		});


		describe("$scope.board", function() {
			it("is defined", function() {
				expect($scope.board).toBeDefined();
			});

			it("is an object", function() {
				expect(Object.prototype.toString.call($scope.board)).toEqual(
					"[object Object]");
			});

			it("Equals boardFactory.getBoardSync", inject(function(boardFactory) {
				expect($scope.board).toEqual(boardFactory.getBoardSync());
			}));
		});


		describe("$scope.users", function() {
			it("is defined", function() {
				expect($scope.users).toBeDefined();
			});

			it("is an array", function() {
				expect(Object.prototype.toString.call($scope.users)).toEqual(
					"[object Array]");
			});

			it("is Equal to boardFactory.getBoardUsersSync", inject(function(
				boardFactory) {
				expect($scope.users).toEqual(boardFactory.getBoardUsersSync());
			}));
		});


		describe("$scope.boardName", function() {
			it("is defined", function() {
				expect($scope.boardName).toBeDefined();
			});

			it("is a string", function() {
				expect(typeof $scope.boardName).toEqual("string");
			});

			it("is Equal to the Capitalized filtered $scope.board.name", inject(
				function($filter) {
					expect($scope.boardName).not.toEqual($scope.board.name);
					expect($scope.boardName).toEqual($filter("capitalize")($scope.board
						.name));
				}));
		});


		describe("$scope.userSortOpts", function() {
			it("is defined", function() {
				expect($scope.userSortOpts).toBeDefined();
			});

			it("is an object", function() {
				expect(Object.prototype.toString.call($scope.userSortOpts)).toEqual(
					"[object Object]");
			});

			it("is Equal to an instance of UserSortOpts", inject(function(
				UserSortOpts) {
				expect($scope.userSortOpts.keys).toEqual(new UserSortOpts($scope.stopSort)
					.keys);
			}));
		});


		describe("$scope.addMemberInput", function() {
			it("is defined", function() {
				expect($scope.addMemberInput).toBeDefined();
			});

			it("is a string", function() {
				expect(typeof $scope.addMemberInput).toEqual("string");
			});

			it("is empty", function() {
				expect($scope.addMemberInput).toEqual("");
			});
		});


		describe("$scope.membersSuggestions", function() {
			it("is defined", function() {
				expect($scope.membersSuggestions).toBeDefined();
			});

			it("is an array", function() {
				expect(Object.prototype.toString.call($scope.membersSuggestions)).toEqual(
					"[object Array]");
			});

			it("has preset values", function() {
				var preSet = [{
					email: "sheldon@mail.com"
				}, {
					email: "raj@mail.com"
				}, {
					email: "penny@mail.com"
				}, {
					email: "leonard@mail.com"
				}, {
					email: "wolowitz@mail.com"
				}];

				expect($scope.membersSuggestions).toEqual(preSet);
			});
		});
	});
})();
