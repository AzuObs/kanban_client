(function() {
	"use strict";


	describe("oauthCtrl", function() {
		var $scope;

		beforeEach(function() {
			module("oauthModule");
			inject(function($controller, $q, userFactory, $rootScope) {
				$scope = $rootScope.$new();
				$controller("oauthCtrl", {
					$scope: $scope
				});
			});
		});

		describe("$scope.authenticate", function() {
			var apiCalled, apiCallArgs;

			beforeEach(inject(function(userFactory) {
				spyOn(userFactory, "authenticate").and.callFake(function() {
					apiCalled = true;
					apiCallArgs = arguments;
				});
			}));

			it("exists", function() {
				expect($scope.authenticate).toBeDefined();
			});

			it("is type function", function() {
				expect(typeof $scope.authenticate).toEqual("function");
			});

			it("calls userFactory.authenticate", function() {
				apiCalled = false;
				$scope.authenticate();
				expect(apiCalled).toEqual(true);
			});

			it("calls userFactory.authenticate with args [username, password]",
				function() {
					apiCallArgs = [];

					$scope.loginUsername = "username";
					$scope.loginPwd = "password";
					$scope.authenticate();

					expect(apiCallArgs.length).toEqual(2);
					expect(apiCallArgs[0]).toEqual("username");
					expect(apiCallArgs[1]).toEqual("password");
				});
		});


		describe("$scope.createUser()", function() {
			var apiCalled, apiCallArgs;

			beforeEach(inject(function(userFactory) {
				spyOn(userFactory, "createUser").and.callFake(function() {
					apiCalled = true;
					apiCallArgs = arguments;
				});
			}));

			it("is defined", function() {
				expect($scope.createUser).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof($scope.createUser)).toEqual("function");
			});

			it("calls userFactory.createUser", function() {
				apiCalled = false;
				$scope.createUser();
				expect(apiCalled).toEqual(true);
			});

			it("calls userFactory.createUser with args [username, password]",
				function() {
					apiCallArgs = [];

					$scope.newAccUsername = "username";
					$scope.newAccPwd = "password";
					$scope.createUser();

					expect(apiCallArgs.length).toEqual(2);
					expect(apiCallArgs[0]).toEqual("username");
					expect(apiCallArgs[1]).toEqual("password");
				});
		});

		describe("$scope.showNewAccForm", function() {
			it("is defined", function() {
				expect($scope.showNewAccForm).toBeDefined();
			});

			it("is a string", function() {
				expect(typeof $scope.showNewAccForm).toEqual("boolean");
			});

			it("is present to '123'", function() {
				expect($scope.showNewAccForm).toEqual(true);
			});
		});


		describe("$scope.newAccUsername", function() {
			it("is defined", function() {
				expect($scope.newAccUsername).toBeDefined();
			});

			it("is a string", function() {
				expect(typeof($scope.newAccUsername)).toEqual("string");
			});

			it("is empty", function() {
				expect($scope.newAccUsername).toEqual("");
			});
		});


		describe("$scope.newAccPwd", function() {
			it("is defined", function() {
				expect($scope.newAccPwd).toBeDefined();
			});

			it("is a string", function() {
				expect(typeof($scope.newAccPwd)).toEqual("string");
			});

			it("is empty", function() {
				expect($scope.newAccPwd).toEqual("");
			});
		});


		describe("$scope.newAccPwdVerify", function() {
			it("is defined", function() {
				expect($scope.newAccPwdVerify).toBeDefined();
			});

			it("is a string", function() {
				expect(typeof($scope.newAccPwdVerify)).toEqual("string");
			});

			it("is empty", function() {
				expect($scope.newAccPwdVerify).toEqual("");
			});
		});


		describe("$scope.loginUsername", function() {
			it("is defined", function() {
				expect($scope.loginUsername).toBeDefined();
			});

			it("is a string", function() {
				expect(typeof($scope.loginUsername)).toEqual("string");
			});

			it("is present to 'sheldon'", function() {
				expect($scope.loginUsername).toEqual("Sheldon");
			});
		});


		describe("$scope.loginPwd", function() {
			it("is defined", function() {
				expect($scope.loginPwd).toBeDefined();
			});

			it("is a string", function() {
				expect(typeof($scope.loginPwd)).toEqual("string");
			});

			it("is present to '123'", function() {
				expect($scope.loginPwd).toEqual("123");
			});
		});
	});
})();
