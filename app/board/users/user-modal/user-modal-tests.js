(function() {
	"use strict";

	describe("userModalCtrl", function() {
		var $scope, user, $modalInstance;

		beforeEach(module("userModalModule"));

		beforeEach(inject(function($controller, $rootScope, $modal) {
			user = {
				_id: "123",
				username: "foo"
			};
			$scope = $rootScope.$new();
			$scope.board = {
				admins: [{
					_id: user._id
				}],
				members: [],
				categories: [{
					tasks: [{
						users: [{}]
					}]
				}]
			};
			$scope.users = [];
			$modalInstance = $modal.open({
				template: "<div></div>"
			});

			$controller("userModalCtrl", {
				$scope: $scope,
				$modalInstance: $modalInstance,
				user: user
			});
		}));

		describe("$scope.userIsAdmin()", function() {
			it("should be defined", function() {
				expect($scope.userIsAdmin).toBeDefined();
			});

			it("should be a function", function() {
				expect(typeof $scope.userIsAdmin).toEqual("function");
			});

			it("should return true is a user is an admin", function() {
				expect($scope.userIsAdmin()).toEqual(true);
			});

			it("should return false is a user is a member", function() {
				$scope.board.admins = [];
				$scope.board.members = [{
					_id: user._id
				}];
				expect($scope.userIsAdmin()).toEqual(false);
			});
		});

		describe("$scope.removeUser", function() {
			it("is defined", function() {
				expect($scope.removeUser).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.removeUser).toEqual("function");
			});

			it("logs an error when no argument is received", inject(function($log) {
				$log.reset();
				$scope.removeUser();
				expect($log.error.logs[0][0]).toBeDefined();
			}));

			it("toggles $scope.isDeleting and resets user input on click", function() {
				var e = {
					type: "click"
				};
				$scope.isDeleting = false;
				$scope.repeatUsername = "foo";
				$scope.removeUser(e);
				expect($scope.isDeleting).toEqual(true);
				expect($scope.repeatUsername).toEqual("");

				$scope.isDeleting = true;
				$scope.repeatUsername = "foo";
				$scope.removeUser(e);
				expect($scope.isDeleting).toEqual(false);
				expect($scope.repeatUsername).toEqual("");
			});

			it("checks the input matches the name of the user before deleting", inject(function($log) {
				var e;
				e = {
					type: "keypress",
					which: 13
				};

				$log.reset();
				$scope.repeatUsername = "foo";
				$scope.modalUser.username = "bar";
				$scope.removeUser(e);
				expect($log.error.logs[0][0]).toBeDefined();

				$log.reset();
				$scope.repeatUsername = "foo";
				$scope.modalUser.username = "foo";
				$scope.removeUser(e);
				expect(function() {
					console.log($log.error.log[0][0]);
				}).toThrow();
			}));

			it("removes user from board admin on enter keypress", function() {
				var e;
				e = {
					type: "keypress",
					which: 13
				};

				$scope.modalUser.username = "foo";
				$scope.modalUser._id = "123";

				$scope.board.admins = [{
					_id: $scope.modalUser._id
				}];
				$scope.repeatUsername = "foo";
				$scope.removeUser(e);

				expect($scope.board.admins.length).toEqual(0);
			});

			it("removes user from board members on enter keypress", function() {
				var e;
				e = {
					type: "keypress",
					which: 13
				};

				$scope.modalUser.username = "foo";
				$scope.modalUser._id = "123";

				$scope.board.members = [{
					_id: $scope.modalUser._id
				}];
				$scope.repeatUsername = "foo";
				$scope.removeUser(e);

				expect($scope.board.members.length).toEqual(0);
			});

			it("removes user from board users on enter keypress", function() {
				var e;
				e = {
					type: "keypress",
					which: 13
				};

				$scope.modalUser.username = "foo";
				$scope.modalUser._id = "123";

				$scope.users = [{
					_id: $scope.modalUser._id
				}];
				$scope.repeatUsername = "foo";
				$scope.removeUser(e);

				expect($scope.users.length).toEqual(0);
			});

			it("removes user from board tasks on enter keypress", function() {
				var e;
				e = {
					type: "keypress",
					which: 13
				};

				$scope.modalUser.username = "foo";
				$scope.repeatUsername = "foo";

				$scope.modalUser._id = "123";
				$scope.board.categories[0].tasks[0].users[0]._id = $scope.modalUser._id;
				$scope.removeUser(e);

				expect($scope.board.categories[0].tasks[0].users.length).toEqual(0);
			});

			it("updates server board after local updates", inject(function(boardAPI, $q) {
				var e, apiCalled, apiDefer;

				e = {
					type: "keypress",
					which: 13
				};
				apiCalled = false;

				$scope.modalUser.username = "foo";
				$scope.repeatUsername = "foo";
				$scope.modalUser._id = "123";
				$scope.users = [{
					_id: "456"
				}];

				spyOn(boardAPI, "updateBoard").and.callFake(function() {
					apiDefer = $q.defer();
					apiCalled = true;
					return apiDefer.promise;
				});
				$scope.removeUser(e);

				expect(apiCalled).toEqual(true);
			}));

			it("increments board version and closes the modal on resolve", inject(function(boardAPI, $q) {
				var e, apiDefer, modalCalled;

				e = {
					type: "keypress",
					which: 13
				};

				spyOn(boardAPI, "updateBoard").and.callFake(function() {
					apiDefer = $q.defer();
					return apiDefer.promise;
				});

				modalCalled = false;
				spyOn($modalInstance, "dismiss").and.callFake(function() {
					modalCalled = true;
				});

				$scope.modalUser.username = "foo";
				$scope.repeatUsername = "foo";
				$scope.modalUser._id = "123";
				$scope.users = [{
					_id: "456"
				}];
				$scope.board._v = 0;

				$scope.removeUser(e);
				$scope.$apply(function() {
					apiDefer.resolve();
				});

				expect($scope.board._v).toEqual(1);
				expect(modalCalled).toEqual(true);
			}));

			it("logs an error on reject", inject(function(boardAPI, $q, $log) {
				var e, apiDefer, msg;

				e = {
					type: "keypress",
					which: 13
				};
				msg = "error";

				spyOn(boardAPI, "updateBoard").and.callFake(function() {
					apiDefer = $q.defer();
					return apiDefer.promise;
				});

				$scope.modalUser.username = "foo";
				$scope.repeatUsername = "foo";
				$scope.modalUser._id = "123";
				$scope.users = [{
					_id: "456"
				}];
				$scope.board._v = 0;

				$scope.removeUser(e);
				$scope.$apply(function() {
					$log.reset();
					apiDefer.reject(msg);
				});

				expect($log.error.logs[0][0]).toEqual(msg);
			}));

			it("deletes the server board if there are no users left", inject(function(boardAPI, $q) {
				var e, apiCalled, apiDefer;

				e = {
					type: "keypress",
					which: 13
				};

				apiCalled = false;
				spyOn(boardAPI, "deleteBoard").and.callFake(function() {
					apiDefer = $q.defer();
					apiCalled = true;
					return apiDefer.promise;
				});

				$scope.modalUser.username = "foo";
				$scope.repeatUsername = "foo";
				$scope.users = [];
				$scope.removeUser(e);

				expect(apiCalled).toEqual(true);
			}));

			it("it routes to kanban.boardList/:username on resolve", inject(function($q, boardAPI, $state) {
				var e, stateCalled, stateArgs, apiDefer;

				e = {
					type: "keypress",
					which: 13
				};

				spyOn(boardAPI, "deleteBoard").and.callFake(function() {
					apiDefer = $q.defer();
					return apiDefer.promise;
				});

				stateCalled = false;
				spyOn($state, "go").and.callFake(function() {
					stateArgs = arguments;
					stateCalled = true;
				});

				$scope.user = {
					username: "foobar"
				};
				$scope.modalUser.username = "foo";
				$scope.repeatUsername = "foo";
				$scope.users = [];
				$scope.removeUser(e);
				$scope.$apply(function() {
					apiDefer.resolve();
				});

				expect(stateCalled).toEqual(true);
				expect(stateArgs[0]).toEqual("kanban.boardList");
				expect(stateArgs[1].username).toEqual($scope.user.username);
			}));

			it("it logs an error on reject", inject(function(boardAPI, $q, $log) {
				var e, apiDefer, msg;

				msg = "error";
				e = {
					type: "keypress",
					which: 13
				};

				spyOn(boardAPI, "deleteBoard").and.callFake(function() {
					apiDefer = $q.defer();
					return apiDefer.promise;
				});

				$scope.modalUser.username = "foo";
				$scope.repeatUsername = "foo";
				$scope.users = [];
				$scope.removeUser(e);
				$scope.$apply(function() {
					$log.reset();
					apiDefer.reject(msg);
				});

				expect($log.error.logs[0][0]).toEqual(msg);
			}));
		});

		describe("$scope.closeModal", function() {
			it("is defined", function() {
				expect($scope.closeModal).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.closeModal).toEqual("function");
			});

			it("closes the modal", function() {
				var isDismissed;
				spyOn($modalInstance, "dismiss").and.callFake(function() {
					isDismissed = true;
				});
				$scope.closeModal();
				expect(isDismissed).toEqual(true);
			});
		});


		describe("$scope.changeUserRBAC()", function() {
			it("is defined", function() {
				expect($scope.changeUserRBAC).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.changeUserRBAC).toEqual("function");
			});

			it("logs an error if no argument is received", inject(function($log) {
				$log.reset();
				$scope.changeUserRBAC();
				expect($log.error.logs[0][0]).toBeDefined();
			}));

			it("toggles $scope.isEditingRBAC", function() {
				$scope.isEditingRBAC = false;
				$scope.changeUserRBAC(1);
				expect($scope.isEditingRBAC).toEqual(true);
				$scope.changeUserRBAC(1);
				expect($scope.isEditingRBAC).toEqual(false);
			});
		});


		describe("$scope.cancelEditing()", function() {
			it("is defined", function() {
				expect($scope.cancelEditing).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.cancelEditing).toEqual("function");
			});

			it("logs an error if not event argument is received", inject(function($log) {
				$log.reset();
				$scope.cancelEditing();
				expect($log.error.logs[0][0]).toBeDefined();
			}));

			it("cancels editing RBAC when a click is outside of .change-rbac", function() {
				var e;

				e = {
					target: angular.element("<div class='change-rbac'></div>")
				};
				$scope.isEditingRBAC = true;
				$scope.cancelEditing(e);
				expect($scope.isEditingRBAC).toEqual(true);

				e = {
					target: angular.element("<div></div>")
				};
				$scope.isEditingRBAC = true;
				$scope.cancelEditing(e);
				expect($scope.isEditingRBAC).toEqual(false);
			});

			it("recalculates userRBAC when it cancels editing", function() {
				var e = {
					target: angular.element("<div></div>")
				};
				$scope.board.members = [{
					_id: user._id
				}];
				$scope.board.admins = [];
				$scope.userRBAC = "admin";
				$scope.isEditingRBAC = true;
				$scope.cancelEditing(e);
				expect($scope.userRBAC).toEqual("member");
			});

			it("cancels deleting when click is outside of .remove-user", function() {
				var e;

				e = {
					target: angular.element("<div class='remove-user'></div>")
				};
				$scope.isDeleting = true;
				$scope.cancelEditing(e);
				expect($scope.isDeleting).toEqual(true);

				e = {
					target: angular.element("<div></div>")
				};
				$scope.isDeleting = true;
				$scope.cancelEditing(e);
				expect($scope.isDeleting).toEqual(false);
			});

			it("resets repeatUsername when it cancels deleting", function() {
				var e = {
					target: angular.element("<div></div>")
				};
				$scope.repeatUsername = "foo";
				$scope.isDeleting = true;
				$scope.cancelEditing(e);
				expect($scope.repeatUsername).toEqual("");
			});
		});


		describe("$scope.getUserRBAC()", function() {
			it("is defined", function() {
				expect($scope.getUserRBAC).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.getUserRBAC).toEqual("function");
			});

			it("returns 'member' if the user is a member", function() {
				$scope.board.members = [{
					_id: user._id
				}];
				$scope.board.admins = [];
				expect($scope.getUserRBAC()).toEqual("member");
			});

			it("return 'admin' if the user is an admin", function() {
				$scope.board.members = [];
				$scope.board.admins = [{
					_id: user._id
				}];
				expect($scope.getUserRBAC()).toEqual("admin");
			});
		});


		describe("$scope.userRBAC", function() {
			it("is defined", function() {
				expect($scope.userRBAC).toBeDefined();
			});

			it("is a string", function() {
				expect(typeof $scope.userRBAC).toEqual("string");
			});

			it("is 'member'", function() {
				expect($scope.userRBAC).toEqual("admin");
			});
		});


		describe("$scope.repeatUsername", function() {
			it("is defined", function() {
				expect($scope.repeatUsername).toBeDefined();
			});

			it("is a string", function() {
				expect(typeof $scope.repeatUsername).toEqual("string");
			});

			it("is empty", function() {
				expect($scope.repeatUsername).toEqual("");
			});
		});


		describe("$scope.isDeleting", function() {
			it("is defined", function() {
				expect($scope.isDeleting).toBeDefined();
			});

			it("is a boolean", function() {
				expect(typeof $scope.isDeleting).toEqual("boolean");
			});

			it("is false", function() {
				expect($scope.isDeleting).toEqual(false);
			});
		});


		describe("$scope.isEditingRBAC", function() {
			it("is defined", function() {
				expect($scope.isEditingRBAC).toBeDefined();
			});

			it("is a boolean", function() {
				expect(typeof $scope.isEditingRBAC).toEqual("boolean");
			});

			it("is false", function() {
				expect($scope.isEditingRBAC).toEqual(false);
			});
		});


		describe("$scope.modalUser", function() {
			it("is defined", function() {
				expect($scope.modalUser).toBeDefined();
			});

			it("is an object", function() {
				expect(Object.prototype.toString.call($scope.modalUser)).toEqual("[object Object]");
			});

			it("is the user that is injected into the controller", function() {
				expect($scope.modalUser).toEqual(user);
			});
		});
	});
})();
