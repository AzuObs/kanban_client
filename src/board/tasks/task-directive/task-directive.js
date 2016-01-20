(function() {
	"use strict";

	var module = angular.module("taskDirectiveModule", ["boardAPIModule", "ui.bootstrap", "ui.sortable", "userDirectiveModule"]);

	module.directive("kbTask", function() {
		return {
			// require = "^category-dir",
			// scope : {
			// 	task: "=ngModel"
			// 	deleteTask: "&deleteTask",
			// 	
			// 	
			// }
			restrict: "E",
			replace: true,
			templateUrl: "board/tasks/task-directive/task-directive.html",
			controller: "kbTaskCtrl"
		};
	});

	module.controller("kbTaskCtrl", ["boardAPI", "$scope", "$log", function(boardAPI, $scope, $log) {
		$scope.deleteTask = function(category, task) {
			boardAPI.deleteTask(category, task);
		};
	}]);
})();
