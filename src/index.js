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
			$stateProvider.state("kanban", {
				abstract: true,
				url: "/kanban"
			});


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
