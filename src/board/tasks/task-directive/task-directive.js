(function() {
	"use strict";

	var module = angular.module("taskDirectiveModule", [
		"boardAPIModule", "ui.bootstrap", "ui.sortable", "userDirectiveModule"
	]);


	module.directive("kbTask", function() {
		var directiveDefinition = {
			restrict: "E",
			replace: true,
			templateUrl: "board/tasks/task-directive/task-directive.html",
			controller: "kbTaskCtrl",
			link: function(scope, elem, attr) {
				scope.$on("$destroy", function() {
					//cleanup
				});
			}
		};

		return directiveDefinition;
	});


	module.controller("kbTaskCtrl", [
		"boardAPI", "$scope",
		function(boardAPI, $scope) {
			$scope.deleteTask = function(category, task) {
				boardAPI.deleteTask(category, task);
			};
		}
	]);
})();
