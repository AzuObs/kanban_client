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
		$scope.deleteTask = function(category, taskId) {
			boardAPI
				.deleteTask($scope.board._id, category._id, taskId)
				.then(function(res) {
					for (var i = 0; i < category.tasks.length; i++) {
						if (category.tasks[i]._id === taskId) {
							category.tasks.splice(i, 1);
						}
					}
				}, function(err) {
					$log.error(err);
				});
		};
	}]);
})();
