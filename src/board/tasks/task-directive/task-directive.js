(function() {
	"use strict";

	var module = angular.module("taskDirectiveModule", [
		"boardFactoryModule",
		"ui.bootstrap",
		"ui.sortable",
		"userDirectiveModule",
		"UserSortOptsModule"
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
		"boardFactory", "$scope", "$log", "UserSortOpts",
		function(boardFactory, $scope, $log, UserSortOpts) {
			$scope.board = boardFactory.getBoardSync();
			$scope.userSortOpts = new UserSortOpts();
			$scope.showUserList = $scope.userSortOpts.getShowUserLists();

			$scope.deleteTask = function(category, task) {
				boardFactory.deleteTask(category, task);
			};
		}
	]);
})();
