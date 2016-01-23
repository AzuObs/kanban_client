(function() {
	"use strict";

	var module = angular.module("taskDirectiveModule", [
		"boardFactoryModule",
		"ui.bootstrap",
		"ui.sortable",
		"userDirectiveModule",
		"sortOptsModule"
	]);


	module.directive("kbTask", function() {
		var directiveDefinition = {
			scope: {
				task: "=ngModel",
				category: "=categoryModel"
			},
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
		"boardFactory", "$scope", "$log", "userSortOpts",
		function(boardFactory, $scope, $log, userSortOpts) {

			$scope.board = boardFactory.getBoardSync();
			$scope.showUserList = userSortOpts.getShowUserLists();
			$scope.userSortOpts = userSortOpts.getSortOpts();

			$scope.deleteTask = function(category, task) {
				boardFactory.deleteTask(category, task);
			};
		}
	]);
})();
