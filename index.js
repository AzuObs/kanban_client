(function() {
	"use strict";

	var app = angular.module("kanbanApp", [
		"ui.bootstrap",
		"ui.router",
		"kanbanModule",
		"identityModule",
		"aboutModule",
		"stateInfoModule",
		"angular-loading-bar"
	]);


	app.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/identity");
	});

	app.run(function($state, $rootScope) {
		$rootScope.endPoint = "http://bigbangkanban.herokuapp.com/api";
		// $rootScope.endPoint = "http://localhost:8000/api";
		$rootScope.state = $state;
	});
})();
