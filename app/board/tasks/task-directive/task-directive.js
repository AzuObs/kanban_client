(function() {
	"use strict";

	var module = angular.module("taskDirectiveModule", []);

	module.directive("kbTask", function() {
		return {
			restrict: "E",
			replace: true,
			templateUrl: "app/board/tasks/task-directive/task-directive.html"
		};
	});


})();
