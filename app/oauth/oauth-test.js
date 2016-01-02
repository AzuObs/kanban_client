(function() {
	"use strict";
	describe("oauthModule.config $stateProvider", function() {
		var stateProviderArgs;

		// the following is a hack
		// in order to test the config phase of my target module 
		// I need to set the spies up before .config has been executed		
		beforeEach(function() {
			module("aboutModule", function($stateProvider) {
				spyOn($stateProvider, "state").and.callFake(function() {
					stateProviderArgs = arguments;
				});
			});
			module("oauthModule");
		});

		beforeEach(inject(function() {}));

		it("exists", function() {
			expect(stateProviderArgs).not.toBe(undefined);
		});

		it("sets the state to kanban.oauth", function() {
			expect(stateProviderArgs[0]).toEqual("kanban.oauth");
		});

		it("sets the url to identity", function() {
			expect(stateProviderArgs[1].url).toEqual("/identity");
		});

		it("sets all the views", function() {
			var views = {
				"navbar-view@": {
					templateUrl: "common/navbar/navbar.html",
					controller: "navbarCtrl"
				},
				"state-info-view@": {
					templateUrl: "common/state-info/state-info.html",
					controller: "stateInfoCtrl"
				},
				"body-view@": {
					templateUrl: "oauth/oauth.html",
					controller: "oauthCtrl"
				},
				"footer-view@": {
					templateUrl: "common/footer/footer.html"
				}
			};

			expect(stateProviderArgs[1].views).toEqual(views);
		});
	});


	describe("oauthCtrl", function() {
		var defer, $log, $scope, stateArgs;

		beforeEach(module("oauthModule"));

		beforeEach(inject(function($controller, $q, oauthAPI, $rootScope, _$log_, $state) {
			$scope = $rootScope.$new();
			defer = $q.defer();
			$log = _$log_;

			spyOn($state, "go").and.callFake(function() {
				stateArgs = arguments;
			});

			spyOn(oauthAPI, "createUser").and.returnValue(defer.promise);
			spyOn(oauthAPI, "authenticate").and.returnValue(defer.promise);

			$controller("oauthCtrl", {
				$scope: $scope,
				oauthAPI: oauthAPI,
				$state: $state,
				$log: $log
			});
		}));


		describe("$scope.newAccUsr", function() {
			it("exists", function() {
				expect($scope.newAccUsr).toBeDefined();
			});

			it("=== ''", function() {
				expect($scope.newAccUsr).toEqual("");
			});

			it("type String", function() {
				expect(typeof($scope.newAccUsr)).toEqual("string");
			});
		});


		describe("$scope.newAccPwd", function() {
			it("exists", function() {
				expect($scope.newAccPwd).toBeDefined();
			});

			it("=== ''", function() {
				expect($scope.newAccPwd).toEqual("");
			});

			it("type String", function() {
				expect(typeof($scope.newAccPwd)).toEqual("string");
			});
		});


		describe("$scope.newAccPwdVerify", function() {
			it("exists", function() {
				expect($scope.newAccPwdVerify).toBeDefined();
			});

			it("=== ''", function() {
				expect($scope.newAccPwdVerify).toEqual("");
			});

			it("type String", function() {
				expect(typeof($scope.newAccPwdVerify)).toEqual("string");
			});
		});


		describe("$scope.loginUsername", function() {
			it("exists", function() {
				expect($scope.loginUsername).toBeDefined();
			});

			it("=== ''", function() {
				expect($scope.loginUsername).toEqual("sheldon");
			});

			it("type String", function() {
				expect(typeof($scope.loginUsername)).toEqual("string");
			});
		});


		describe("$scope.loginPwd", function() {
			it("exists", function() {
				expect($scope.loginPwd).toBeDefined();
			});

			it("=== ''", function() {
				expect($scope.loginPwd).toEqual("123");
			});

			it("type String", function() {
				expect(typeof($scope.loginPwd)).toEqual("string");
			});
		});


		describe("$scope.createUser()", function() {
			var res;

			beforeEach(function() {
				res = {
					user: {
						_id: "123456",
						username: "sheldon"
					},
					token: "xlobcad"
				};
			});

			it("exists", function() {
				expect($scope.createUser).toBeDefined();
			});

			it("is type 'function'", function() {
				expect(typeof($scope.createUser)).toEqual("function");
			});

			it("sets sessionStorage.userID on resolve", function() {
				delete sessionStorage.token;

				$scope.createUser();
				$scope.$apply(function() {
					defer.resolve(res);
				});

				expect(sessionStorage.userId).toEqual(res.user._id);
			});

			it("stores token in sessionStorage on success", function() {
				delete sessionStorage.token;

				$scope.createUser();
				$scope.$apply(function() {
					defer.resolve(res);
				});

				expect(sessionStorage.token).toEqual(res.token);
			});

			it("redirects to state kanban.boardList with {username: res.user.username} on success", function() {
				$scope.createUser();
				defer.resolve(res);

				expect(stateArgs[0]).toEqual("kanban.boardList");
				expect(stateArgs[1].username).toEqual("sheldon");
			});

			it("logs error msg on failure", function() {
				$log.reset();

				var res = "error: failure";
				$scope.createUser();
				$scope.$apply(function() {
					defer.reject(res);
				});

				expect($log.error.logs[0][0]).toEqual(res);
			});
		});


		describe("$scope.authenticate", function() {
			var res;

			beforeEach(function() {
				res = {
					user: {
						_id: "123456",
						username: "sheldon"
					},
					token: "xlobcad"
				};
			});

			it("exists", function() {
				expect($scope.authenticate).toBeDefined();
			});

			it("is type function", function() {
				expect(typeof $scope.authenticate).toEqual("function");
			});

			it("sets sessionStorage.userID on resolve", function() {
				delete sessionStorage.userId;

				$scope.authenticate();
				$scope.$apply(function() {
					defer.resolve(res);
				});

				expect(sessionStorage.userId).toEqual(res.user._id);
			});

			it("stores token in sessionStorage on success", function() {
				delete sessionStorage.token;

				$scope.createUser();
				$scope.$apply(function() {
					defer.resolve(res);
				});

				expect(sessionStorage.token).toEqual(res.token);
			});

			it("redirects to kanban.boardList @params{username: req.username} on resolve", function() {
				$scope.authenticate();
				defer.resolve(res);

				expect(stateArgs[0]).toEqual("kanban.boardList");
				expect(stateArgs[1].username).toEqual("sheldon");
			});

			it("logs error msg on failure", function() {
				$log.reset();

				var res = "error: failure";
				$scope.createUser();
				$scope.$apply(function() {
					defer.reject(res);
				});

				expect($log.error.logs[0][0]).toEqual(res);
			});
		});
	});
})();
