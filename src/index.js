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
		"$stateProvider", "$urlRouterProvider", "$compileProvider", "$injector", "ENV", "cfpLoadingBarProvider",
		function($stateProvider, $urlRouterProvider, $compileProvider, $injector, ENV, cfpLoadingBarProvider) {
			$stateProvider.state("kanban", {
				abstract: true,
				url: "/kanban",
				controller: "appCtrl"
			});

			$urlRouterProvider.otherwise(function($injector) {
				$injector.invoke(["errorHandler", function(errorHandler) {
					errorHandler.handleAppError("Not Found");
				}]);
			});

			// during production
			$compileProvider.debugInfoEnabled(ENV.debugApp);

			cfpLoadingBarProvider.includeSpinner = false;
			cfpLoadingBarProvider.latencyTreshold = 250;
		}
	]);

	module.controller("appCtrl", [
		"$rootScope", "$state", "errorHandler",
		function($rootScope, $state, errorHandler) {
			$rootScope.state = $state;

			$rootScope.$on("$stateChangeError", function() {
				errorHandler.handleAppError("State Change Error");
			});
		}
	]);
})();
