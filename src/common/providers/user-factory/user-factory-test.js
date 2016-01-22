(function() {
	"use strict";

	describe("userFactory", function() {
		var $httpBackend, userFactory, $rootScope;

		beforeEach(module("userFactoryModule"));
		beforeEach(inject(function(_$httpBackend_, _userFactory_, _$rootScope_) {
			$httpBackend = _$httpBackend_;
			userFactory = _userFactory_;
			$rootScope = _$rootScope_;
			$rootScope.endPoint = "http://foo.com";
		}));


		describe("createUser()", function() {
			it("exists", function() {
				expect(userFactory.createUser).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof userFactory.createUser).toEqual("function");
			});

			it("returns a promise", function() {
				expect(function() {
					userFactory.createUser().then();
				}).not.toThrow();
			});

			it("sends a POST request to '$rootScope.endPoint' + '/user'", function() {
				$httpBackend.expect("POST", $rootScope.endPoint + "/user").respond();
				$rootScope.$apply(function() {
					userFactory.createUser();
				});
			});

			it("sends a body containing object with keys ['username', 'pwd']", function() {
				var req = {
					username: "foo",
					pwd: "bar"
				};

				$httpBackend.expectPOST($rootScope.endPoint + "/user", req).respond();
				$rootScope.$apply(function() {
					userFactory.createUser(req.username, req.pwd);
				});
			});

			it("resolves on success", function() {
				var defer, test;

				$httpBackend.whenPOST().respond(200, "");
				defer = userFactory.createUser();
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
				defer = userFactory.createUser();
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
