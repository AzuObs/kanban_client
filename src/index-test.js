(function() {
	"use strict";

	describe("kanbanApp module", function() {
		var debugInfoEnabled, cfpLoadingBarProvider, $rootScope;

		// the following is a hack
		// in order to test the config phase of my target module 
		// I need to set the spies up before .config has been executed		
		beforeEach(function() {
			module("aboutModule", function($compileProvider) {
				spyOn($compileProvider, "debugInfoEnabled").and.callFake(function() {
					debugInfoEnabled = arguments[0];
				});
			});
			module("kanbanApp", function(_cfpLoadingBarProvider_) {
				cfpLoadingBarProvider = _cfpLoadingBarProvider_;
			});

			inject(function(_$rootScope_) {
				// this has to be here even if we do not inject anything
				// or else cfpLoadingBarProvider and debugInfoEnabled will
				// be undefined
				$rootScope = _$rootScope_;
			});
		});


		describe("config phase", function() {
			describe("debugInfoEnabled", function() {
				it("is enabled during production", function() {
					expect(debugInfoEnabled).toEqual(true);
				});
			});

			describe("cfpLoadingBarProvider", function() {
				it("has a disabled spinner", function() {
					expect(cfpLoadingBarProvider.includeSpinner).toEqual(false);
				});

				it("has a latency treshold to 250ms", function() {
					expect(cfpLoadingBarProvider.latencyTreshold).toEqual(250);
				});
			});
		});


		describe("run phase", function() {
			describe("$rootScope.websiteTitle", function() {
				it("is defined", function() {
					expect($rootScope.websiteTitle).toBeDefined();
				});

				it("is a string", function() {
					expect(typeof $rootScope.websiteTitle).toEqual("string");
				});


				it("it is equal to ENV.version", inject(function(ENV) {
					expect($rootScope.websiteTitle).toEqual("Kanban " + ENV.websiteVersion);
				}));
			});
		});
	});
})();
