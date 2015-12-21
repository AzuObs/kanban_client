(function() {
	"use strict";

	describe("kanbanApp.config", function() {
		var stateArgs, urlRouterArgs, $http, $httpBackend, $rootScope;

		// the following is a hack
		// in order the to test the config phase of kanbanApp 
		// I need to set the spies up before kanbanApp.config has been executed
		beforeEach(function() {
			module("boardModule", function($stateProvider, $urlRouterProvider) {
				spyOn($stateProvider, "state").and.callFake(function() {
					stateArgs = arguments;
				});
				spyOn($urlRouterProvider, "otherwise").and.callFake(function() {
					urlRouterArgs = arguments;
				});
			});
			module("kanbanApp");
		});


		beforeEach(inject(function(_$http_, _$httpBackend_, _$rootScope_) {
			$rootScope = _$rootScope_;
			$http = _$http_;
			$httpBackend = _$httpBackend_;
		}));

		describe("$stateProvider", function() {
			it("exists", function() {
				expect(stateArgs).not.toBe(undefined);
			});

			it("sets the state to 'kanban'", function() {
				expect(stateArgs[0]).toEqual("kanban");
			});

			it("is abstract", function() {
				expect(stateArgs[1].abstract).toEqual(true);
			});


			it("sets the state url to '/kanban'", function() {
				expect(stateArgs[1].url).toEqual("/kanban");
			});
		});

		describe("$urlRouteProvider", function() {
			it("exists", function() {
				expect(urlRouterArgs).not.toBe(undefined);
			});

			it("sets the redirect url to '/kanban/identity'", function() {
				expect(urlRouterArgs[0]).toEqual("/kanban/identity");
			});
		});

		describe("$httpProvider", function() {
			var token;

			beforeEach(function() {
				delete sessionStorage.token;
				token = "123";
			});

			it("sends the token on any request if token is present", function() {
				sessionStorage.token = token;

				$httpBackend.expectGET("http://foo.com", function(headers) {
					return headers.token === token;
				}).respond({
					foo: "foo"
				});

				$http.get("http://foo.com").then(function() {}, function() {});
				$rootScope.$apply();
			});

			it("doesn't send the token on any request if token is absent", function() {
				$httpBackend.expectGET("http://foo.com", function(headers) {
					return headers.token !== token;
				}).respond({
					foo: "foo"
				});

				$http.get("http://foo.com").then(function() {}, function() {});
				$rootScope.$apply();
			});
		});
	});


})();
