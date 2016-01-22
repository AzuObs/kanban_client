(function() {
	"use strict";

	describe("userAPI", function() {
		var $httpBackend, userAPI, $rootScope;

		beforeEach(module("userAPIModule"));
		beforeEach(inject(function(_$httpBackend_, _userAPI_, _$rootScope_) {
			$httpBackend = _$httpBackend_;
			userAPI = _userAPI_;
			$rootScope = _$rootScope_;
			$rootScope.endPoint = "http://foo.com";
		}));


		describe("createUser()", function() {
			it("exists", function() {
				expect(userAPI.createUser).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof userAPI.createUser).toEqual("function");
			});

			it("returns a promise", function() {
				expect(function() {
					userAPI.createUser().then();
				}).not.toThrow();
			});

			it("sends a POST request to '$rootScope.endPoint' + '/user'", function() {
				$httpBackend.expect("POST", $rootScope.endPoint + "/user").respond();
				$rootScope.$apply(function() {
					userAPI.createUser();
				});
			});

			it("sends a body containing object with keys ['username', 'pwd']", function() {
				var req = {
					username: "foo",
					pwd: "bar"
				};

				$httpBackend.expectPOST($rootScope.endPoint + "/user", req).respond();
				$rootScope.$apply(function() {
					userAPI.createUser(req.username, req.pwd);
				});
			});

			it("resolves on success", function() {
				var defer, test;

				$httpBackend.whenPOST().respond(200, "");
				defer = userAPI.createUser();
				$rootScope.$apply(function() {
					defer.then(function(res) {
						test = true;
					}, function(err) {
						test = false;
					});
				});
				test = false;
				$httpBackend.flush();

				expect(test).toEqual(true);
			});

			it("rejects on failure", function() {
				var defer, test;

				$httpBackend.whenPOST().respond(404, "");
				defer = userAPI.createUser();
				$rootScope.$apply(function() {
					defer.then(function(res) {
						test = true;
					}, function(err) {
						test = false;
					});
				});
				test = false;
				$httpBackend.flush();

				expect(test).toEqual(false);
			});
		});
	});
})();
