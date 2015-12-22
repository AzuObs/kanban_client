(function() {
	"use strict";

	describe("aouthAPI", function() {
		var $httpBackend, oauthAPI, $rootScope;

		beforeEach(module("oauthAPIModule"));
		beforeEach(inject(function(_$httpBackend_, _oauthAPI_, _$rootScope_) {
			$httpBackend = _$httpBackend_;
			oauthAPI = _oauthAPI_;
			$rootScope = _$rootScope_;
			$rootScope.endPoint = "http://foo.com";
		}));


		describe("createUser()", function() {
			it("exists", function() {
				expect(oauthAPI.createUser).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof oauthAPI.createUser).toEqual("function");
			});

			it("returns a promise", function() {
				expect(function() {
					oauthAPI.createUser().then();
				}).not.toThrow();
			});

			it("sends a POST request to '$rootScope.endPoint' + '/user'", function() {
				$httpBackend.expect("POST", $rootScope.endPoint + "/user").respond();
				oauthAPI.createUser();
				$rootScope.$apply();
			});

			it("sends a body containing object with keys ['username', 'pwd']", function() {
				var req = {
					username: "foo",
					pwd: "bar"
				};

				$httpBackend.expectPOST($rootScope.endPoint + "/user", req).respond();
				oauthAPI.createUser(req.username, req.pwd);
				$rootScope.$apply();
			});

			it("resolves on success", function() {
				var defer, test;

				$httpBackend.whenPOST().respond(200, "");
				defer = oauthAPI.createUser();
				defer.then(function(res) {
					test = true;
				}, function(err) {
					test = false;
				});
				test = false;
				$rootScope.$apply();
				$httpBackend.flush();

				expect(test).toEqual(true);
			});

			it("rejects on failure", function() {
				var defer, test;

				$httpBackend.whenPOST().respond(404, "");
				defer = oauthAPI.createUser();
				defer.then(function(res) {
					test = true;
				}, function(err) {
					test = false;
				});
				test = false;
				$rootScope.$apply();
				$httpBackend.flush();

				expect(test).toEqual(false);
			});
		});
	});
})();
