(function() {
	"use strict";

	var CategoryMod = angular.module("kanbanCategoryModule", []);

	CategoryMod.directive("uiCategory", function() {
		return {
			restrict: "E",
			replace: true,
			templateUrl: "kanban/html/category.html",
			controller: "kanbanCategoryCtrl"
		};
	});


	CategoryMod.controller("kanbanCategoryCtrl", function($scope, APIService) {
		$scope.deleteTask = function(category, taskId) {
			APIService
				.deleteTask($scope.board._id, category._id, taskId)
				.then(function(res) {
					for (var i = 0; i < category.tasks.length; i++) {
						if (category.tasks[i]._id === taskId) {
							category.tasks.splice(i, 1);
						}
					}
				}, function(err) {
					$log.log(err);
				});
		};

		$scope.createTask = function(name, category, keyEvent) {
			if (!keyEvent || keyEvent.which === 13) {
				$scope.taskName = "";

				var params = {
					boardId: $scope.board._id,
					categoryId: category._id,
					name: name,
					position: category.tasks.length
				};

				APIService
					.createTask(params)
					.then(function(res) {
						category.tasks.push(res);
					}, function(err) {
						$log.log(err);
					});
			}
		};
	});
})();
