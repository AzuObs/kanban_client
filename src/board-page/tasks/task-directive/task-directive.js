(function() {
	"use strict";

	var module = angular.module("taskDirectiveModule", [
		"boardFactoryModule",
		"ui.bootstrap",
		"ui.sortable",
		"userDirectiveModule",
		"UserSortOptsModule"
	]);


	module.directive("kbTask", ["boardFactory", "UserSortOpts", function(
		boardFactory, UserSortOpts) {
		var directiveDefinition = {
			scope: {
				task: "=ngModel",
				category: "=categoryModel"
			},
			restrict: "E",
			replace: true,
			templateUrl: "board-page/tasks/task-directive/task-directive.html",
			link: function(scope, elem, attr) {

				scope.deleteTask = function() {
					boardFactory.deleteTask(scope.category, scope.task);
				};


				scope.board = boardFactory.getBoardSync();
				scope.userSortOpts = new UserSortOpts();
				scope.showUserList = scope.userSortOpts.getShowUserLists();

				scope.$on("$destroy", function() {
					//cleanup
				});
			}
		};

		return directiveDefinition;
	}]);
})();
