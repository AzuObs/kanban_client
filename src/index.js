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
		"errorHandlerModule"
	]);


	module.config([
		"$stateProvider", "$urlRouterProvider", "$injector",
		function($stateProvider, $urlRouterProvider, $injector) {
			$urlRouterProvider.otherwise(function($injector) {
				$injector.invoke(["errorHandler", function(errorHandler) {
					errorHandler.handleAppError("Not Found");
				}]);
			});

			$stateProvider.state("kanban", {
				abstract: true,
				url: "/kanban"
			});
		}
	]);

	module.run([
		"$rootScope", "$state", "errorHandler",
		function($rootScope, $state, errorHandler) {
			$rootScope.state = $state;

			$rootScope.$on("$stateChangeError", function(err) {
				errorHandler.handleAppError(err);
			});
		}
	]);
})();
