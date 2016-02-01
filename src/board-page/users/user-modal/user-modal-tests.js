(function() {
	"use strict";

	describe("userModalCtrl", function() {
		var $scope, user, $modalInstance;

		beforeEach(function() {
			module("userModalModule");

			inject(function($controller, $rootScope, $modal, boardFactory) {
				// VAR INIT
				user = {
					_id: "user"
				};
				$scope = $rootScope.$new();
				$scope.board = {
					admins: [{
						_id: "user"
					}],
					members: []
				};
				$modalInstance = $modal.open({
					template: "<div></div>"
				});

				// SPY
				spyOn(boardFactory, "getBoardUsersSync").and.callFake(function() {
					return [{
						_id: "user 1"
					}];
				});

				// CTRL
				$controller("userModalCtrl", {
					$scope: $scope,
					$modalInstance: $modalInstance,
					user: user
				});
			});
		});

		////
		//// TESTING
		////


		describe("$scope.cancelEditing()", function() {
			it("is defined", function() {
				expect($scope.cancelEditing).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.cancelEditing).toEqual("function");
			});

			it("does nothing if event click is outside of .change-rbac", function() {
				var e;

				e = {
					target: angular.element("<div class='change-rbac'></div>")
				};
				$scope.isEditingRBAC = true;
				$scope.cancelEditing(e);
				expect($scope.isEditingRBAC).toEqual(true);
			});

			it("set isEditingRBAC to false", function() {
				var e = {
					target: angular.element("<div></div>")
				};

				$scope.isEditingRBAC = true;

				$scope.cancelEditing(e);
				expect($scope.isEditingRBAC).toEqual(false);
			});

			it("resets userRBAC", function() {
				var e = {
					target: angular.element("<div></div>")
				};

				$scope.userRBAC = undefined;

				$scope.cancelEditing(e);
				$scope.userRBAC = "admin";
			});
		});


		describe("$scope.changeUserRBAC()", function() {
			it("is defined", function() {
				expect($scope.changeUserRBAC).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.changeUserRBAC).toEqual("function");
			});

			it("toggles $scope.isEditingRBAC", function() {
				$scope.isEditingRBAC = false;
				$scope.changeUserRBAC();
				expect($scope.isEditingRBAC).toEqual(true);

				$scope.isEditingRBAC = true;
				$scope.changeUserRBAC();
				expect($scope.isEditingRBAC).toEqual(false);
			});
		});


		describe("$scope.removeUser", function() {
			var defer, apiCalled, apiCallArgs;

			beforeEach(inject(function($q, boardFactory) {
				spyOn(boardFactory, "removeUserFromBoard").and.callFake(function() {
					apiCalled = true;
					apiCallArgs = arguments;

					defer = $q.defer();
					return defer.promise;
				});
			}));

			it("is defined", function() {
				expect($scope.removeUser).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.removeUser).toEqual("function");
			});

			it("calls boardFactory.removeUserFromBoard", function() {
				apiCalled = false;
				$scope.removeUser();
				expect(apiCalled).toEqual(true);
			});

			it("calls boardFactory.removeUserFromBoard with args [user]", function() {
				apiCallArgs = [];
				$scope.removeUser();
				expect(apiCallArgs.length).toEqual(1);
				expect(apiCallArgs[0]).toEqual($scope.modalUser);
			});

			it("calls $scope.closeModal on resolve", function() {
				var called = false;
				spyOn($scope, "closeModal").and.callFake(function() {
					called = true;
				});

				$scope.removeUser();
				$scope.$apply(function() {
					defer.resolve();
				});

				expect(called).toEqual(true);
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

			it("$logs an error if the user is neither an admin nor a member", inject(function($log) {
				$log.reset();

				$scope.board.members = [];
				$scope.board.admins = [];
				$scope.getUserRBAC();

				expect($log.error.logs[0][0]).toEqual("user does not have RBAC");
			}));
		});


		describe("$scope.closeModal()", function() {
			it("is defined", function() {
				expect($scope.closeModal).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.closeModal).toEqual("function");
			});

			it("closes the modal", function() {
				var called = false;
				spyOn($modalInstance, "dismiss").and.callFake(function() {
					called = true;
				});
				$scope.closeModal();
				expect(called).toEqual(true);
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


		describe("$scope.userRBAC", function() {
			it("is defined", function() {
				expect($scope.userRBAC).toBeDefined();
			});

			it("is a string", function() {
				expect(typeof $scope.userRBAC).toEqual("string");
			});

			it("is equal to $scope.getUserRBAC()", function() {
				expect($scope.userRBAC).toEqual($scope.getUserRBAC());
			});
		});


		describe("$scope.userIsAdmin", function() {
			it("is defined", function() {
				expect($scope.userIsAdmin).toBeDefined();
			});

			it("is a boolean", function() {
				expect(typeof $scope.userIsAdmin).toEqual("boolean");
			});

			it("is true if user is an admin", inject(function($controller) {
				$scope.board = {
					members: [],
					admins: [{
						_id: "user"
					}]
				};
				user = {
					_id: "user"
				};

				$controller("userModalCtrl", {
					$scope: $scope,
					user: user,
					$modalInstance: $modalInstance
				});

				expect($scope.userIsAdmin).toEqual(true);
			}));

			it("is true if user is a member", inject(function($controller) {
				$scope.board = {
					admins: [],
					members: [{
						_id: "user"
					}]
				};
				user = {
					_id: "user"
				};

				$controller("userModalCtrl", {
					$scope: $scope,
					user: user,
					$modalInstance: $modalInstance
				});

				expect($scope.userIsAdmin).toEqual(false);
			}));
		});
	});
})();
