(function() {
  "use strict";

  describe("kanbanApp module", function() {
    var debugInfoEnabled, cfpLoadingBarProvider, $rootScope;

    beforeEach(function() {
      // in order to test the config phase of "kanbanApp" module
      // we need to create a module with a config function so that we can access the providers that interest us		
      angular.module("configModule", ["angular-loading-bar"]).config(function($compileProvider, _cfpLoadingBarProvider_) {
        spyOn($compileProvider, "debugInfoEnabled").and.callFake(function() {
          debugInfoEnabled = arguments[0];
        });
        cfpLoadingBarProvider = _cfpLoadingBarProvider_;
      });
      // we then need to load our new module BEFORE we load the kanbanApp module in order for our spy to trigger
      // during the loading of the angular module
      angular.module("sequencingModule", ["configModule", "kanbanApp"]);
      // then we will mock our module
      module("mySecondModule");


      inject(function(_$rootScope_) {
        // and finally we need to do the DI and loads the modules, and providers into the caches
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