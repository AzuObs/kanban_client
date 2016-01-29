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
		function($stateProvider, $urlRouterProvider, $compileProvider, $injector, ENV) {
			$stateProvider.state("kanban", {
				abstract: true,
				url: "/kanban"
			});

			// during production
			$compileProvider.debugInfoEnabled(ENV.debugApp);

			$urlRouterProvider.otherwise(function($injector) {
				$injector.invoke(["errorHandler", function(errorHandler) {
					errorHandler.handleAppError("Not Found");
				}]);
			});
		}
	]);

	module.run([
		"$rootScope", "$state", "errorHandler",
		function($rootScope, $state, errorHandler) {
			$rootScope.state = $state;

			$rootScope.$on("$stateChangeError", function() {
				errorHandler.handleAppError("State Change Error");
			});
		}
	]);
})();
