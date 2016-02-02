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
		});

		beforeEach(inject(function(_$rootScope_, $controller) {
			$rootScope = _$rootScope_;
			$controller("appCtrl", {
				$rootScope: $rootScope
			});
		}));


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


		describe("appCtrl", function() {
			describe("$rootScope.state", function() {
				it("is defined", function() {
					expect($rootScope.state).toBeDefined();
				});

				it("is an object", function() {
					expect(Object.prototype.toString.call($rootScope.state)).toEqual("[object Object]");
				});
			});
		});
	});
})();
