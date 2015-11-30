(function() {
	"use strict";

	var module = angular.module("kanbanCategoryModule", []);


	module.directive("uiCategory", function() {
		return {
			restrict: "E",
			replace: true,
			templateUrl: "kanban/html/board.category.directive.html",
			controller: "CategoryDirectiveCtrl"
		};
	});


	module.controller("CategoryDirectiveCtrl", ["$scope", "APIService", function($scope, APIService) {

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

	}]);


	module.controller("kanbanCategoryCtrl", ["$scope", "$log", "APIService", function($scope, $log, APIService) {
		$scope.createCategory = function(name, keyEvent) {
			if (!keyEvent || keyEvent.which === 13) {
				$scope.newCat = "";

				var params = {
					boardId: $scope.board._id,
					name: name,
					position: $scope.board.categories.length
				};

				APIService
					.createCategory(params)
					.then(function(res) {
						$scope.board.categories.push(res);
					}, function(err) {
						$log.log(err);
					});
			}
		};

		$scope.deleteCategory = function(catId) {
			APIService
				.deleteCategory($scope.board._id, catId)
				.then(function(res) {
					for (var i = 0; i < $scope.board.categories.length; i++) {
						if ($scope.board.categories[i]._id === catId) {
							$scope.board.categories.splice(i, 1);
						}
					}
				}, function(err) {
					$log.log(err);
				});
		};

		$scope.categorySortOpts = {
			stop: function(e, ui) {
				// $scope.updateBoard();
			},
			horizontal: true,
			tolerance: "pointer",
			distance: 1,
			cursor: "move",
			opacity: 0.3,
			scroll: true,
			scrollSensitivity: 20
		};
	}]);

})();
