(function() {
	"use strict";

	describe("userMenuCtrl", function() {
		var $scope;

		beforeEach(module("userMenuModule"));
		beforeEach(inject(function($controller, $rootScope) {
			$scope = $rootScope.$new();
			$controller("userMenuCtrl", {
				$scope: $scope
			});
		}));


		describe("$scope.addMember()", function() {
			var apiArgs, apiDefer;
			beforeEach(inject(function(boardAPI, $q) {
				apiArgs = undefined;
				spyOn(boardAPI, "addMemberToBoard").and.callFake(function() {
					apiDefer = $q.defer();
					apiArgs = arguments;
					return apiDefer.promise;
				});
				$scope.user = {};
				$scope.users = [{
					email: "foo"
				}];
			}));

			it("is defined", function() {
				expect($scope.addMember).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.addMember).toEqual("function");
			});

			it("checks that there is either a click or a keypress enter event", function() {
				var e;

				expect(function() {
					$scope.addMember();
				}).toThrow();

				e = {
					type: ""
				};
				apiArgs = undefined;
				$scope.addMember(e);
				expect(apiArgs).toEqual(undefined);

				e = {
					type: "keypress"
				};
				apiArgs = undefined;
				$scope.addMember(e);
				expect(apiArgs).toEqual(undefined);

				e = {
					type: "keypress",
					which: 10
				};
				apiArgs = undefined;
				$scope.addMember(e);
				expect(apiArgs).toEqual(undefined);

				e = {
					type: "keypress",
					which: 13
				};
				apiArgs = undefined;
				$scope.addMember(e);
				expect(apiArgs).not.toEqual(undefined);

				e = {
					type: "click"
				};
				apiArgs = undefined;
				$scope.addMember(e);
				expect(apiArgs).not.toEqual(undefined);
			});

			it("$logs error if user being added is already in the list", inject(function($log) {
				$log.reset();
				$scope.addMemberInput = "foo";
				$scope.addMember({
					type: "click"
				});
				expect($log.error.logs[0][0]).toBeDefined();
			}));

			it("updates the server model", function() {
				$scope.addMember({
					type: "click"
				});
				expect(apiArgs).not.toEqual(undefined);
			});

			it("updates the local model on resolve", function() {
				var user = "foo";
				$scope.users = [];
				$scope.board = {
					members: []
				};
				$scope.addMember({
					type: "click"
				});
				$scope.$apply(function() {
					apiDefer.resolve(user);
				});

				expect($scope.users[0]).toEqual(user);
				expect($scope.board.members[0]).toEqual(user);
			});

			it("logs an error on reject", inject(function($log) {
				$log.reset();
				var msg = "error";

				$scope.addMember({
					type: "click"
				});
				$scope.$apply(function() {
					apiDefer.reject(msg);
				});

				expect($log.error.logs[0][0]).toBeDefined();
			}));
		});


		describe("$scope.setAddMember()", function() {
			it("is defined", function() {
				expect($scope.setAddMember).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.setAddMember).toEqual("function");
			});

			it("logs an error if not arguments are received", inject(function($log) {
				$log.reset();
				$scope.setAddMember();
				expect($log.error.logs[0][0]).toBeDefined();
			}));

			it("sets $scope.addMemberInput to received argument", function() {
				$scope.addMemberInput = "";
				$scope.setAddMember("foo");
				expect($scope.addMemberInput).toEqual("foo");
			});
		});


		describe("$scope.editUser()", function() {
			var modalArgs, $log;

			beforeEach(inject(function($modal) {
				modalArgs = undefined;
				spyOn($modal, "open").and.callFake(function() {
					modalArgs = arguments;
				});
			}));

			it("is defined", function() {
				expect($scope.editUser).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.editUser).toEqual("function");
			});

			it("logs an error if not arguments are received", inject(function($log) {
				$log.reset();
				$scope.editUser();
				expect($log.error.logs[0][0]).toBeDefined();
			}));

			it("opens a modal", function() {
				$scope.editUser({});
				expect(modalArgs).not.toEqual(undefined);
			});

			it("configures a modal", function() {
				$scope.editUser({});
				expect(Object.keys(modalArgs).length).toBeGreaterThan(0);
			});
		});


		describe("$scope.membersSuggestions", function() {
			it("is defined", function() {
				expect($scope.membersSuggestions).toBeDefined();
			});

			it("is an array", function() {
				expect(Object.prototype.toString.call($scope.membersSuggestions)).toEqual("[object Array]");
			});

			it("has preset values", function() {
				var preset = [{
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

				expect($scope.membersSuggestions).toEqual(preset);
			});
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
	});
})();
