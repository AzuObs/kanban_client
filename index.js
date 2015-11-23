(function() {
	"use strict";

	var app = angular.module("kanbanApp", [
		"ui.bootstrap",
		"ui.router",
		"kanbanModule",
		"logginModule",
		"aboutModule",
		"stateInfoModule",
		"angular-loading-bar"
	]);


	app.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/loggin");
	});

	app.run(function($state, $rootScope) {
		$rootScope.endPoint = "http://localhost:8000/api";
		$rootScope.state = $state;
	});
})();
