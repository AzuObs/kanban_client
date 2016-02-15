(function() {
	"use strict";

	var module = angular.module("kanbanApp", [
		"ui.router",
		"aboutModule",
		"boardModule",
		"boardListModule",
		"oauthModule",
		"navbarModule",
		"angular-loading-bar",
		"errorPageModule",
		"errorHandlerModule",
		"copyChildMinHeightDirectiveModule",
		"environmentModule"
	]);


	module.config([
		"$stateProvider", "$urlRouterProvider", "$compileProvider", "$injector", "ENV",
		"cfpLoadingBarProvider",
		function($stateProvider, $urlRouterProvider, $compileProvider, $injector, ENV,
			cfpLoadingBarProvider) {

			$stateProvider.state("kanban", {
				abstract: true,
				url: ""
			});

			// default redirects
			$urlRouterProvider.when("", "/identity");
			$urlRouterProvider.otherwise(function($injector) {
				$injector.invoke(["errorHandler", function(errorHandler) {
					errorHandler.handleAppError("Not Found");
				}]);
			});

			// debugApp === true during development, === false during deployment
			$compileProvider.debugInfoEnabled(ENV.debugApp);

			cfpLoadingBarProvider.includeSpinner = false;
			cfpLoadingBarProvider.latencyTreshold = 250;
		}
	]);


	// 'run' cannot be replaced by 'controller' because it will only give scope to the .body-view 
	// in the HTML, except that the TITLE of the web page needs to be the website version... hence why
	// we need the scope to be greater than .body-view the whole ng-app
	module.run([
		"$rootScope", "ENV", "errorHandler",
		function($rootScope, ENV, errorHandler) {
			$rootScope.websiteVersion = ENV.websiteVersion;
			$rootScope.$on("$stateChangeError", function() {
				errorHandler.handleAppError("State Change Error");
			});
		}
	]);
})();
