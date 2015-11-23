(function() {
	"use strict";

	var stateInfoModule = angular.module("stateInfoModule", []);


	stateInfoModule.controller("stateInfoCtrl", function($rootScope, $scope) {
		$scope.alerts = [];

		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};

		$rootScope.$on("$stateChangeStart", function(event, toState) {
			$scope.alerts = [];
		});

		$rootScope.$on("$stateChangeSuccess", function(event) {
			$scope.alerts = [];
		});

		$rootScope.$on("$stateChangeError", function(event, toState, toParams) {
			//401
			$scope.alerts.push({
				type: "danger",
				msg: "You need to log in to access this content (401)."
			});

			//404
			// $scope.alerts.push({
			// 	type: "danger",
			// 	msg: "Content not found (404)."
			// });


		});
	});

})();
