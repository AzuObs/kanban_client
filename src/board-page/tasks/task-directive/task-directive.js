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
			templateUrl: "board-page/tasks/task-directive/task-directive.html",
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
		"boardFactory", "$scope", "UserSortOpts",
		function(boardFactory, $scope, UserSortOpts) {
			$scope.deleteTask = function() {
				boardFactory.deleteTask($scope.category, $scope.task);
			};

			$scope.board = boardFactory.getBoardSync();
			$scope.userSortOpts = new UserSortOpts();
			$scope.showUserList = $scope.userSortOpts.getShowUserLists();
		}
	]);
})();
