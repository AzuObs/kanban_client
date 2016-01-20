(function() {
	"use strict";

	var module = angular.module("categoryDirectiveModule", ["ui.router", "boardAPIModule"]);

	module.directive("kbCategory", function() {
		return {
			scope: {
				category: "=categoryModel",
				board: "=boardModel"
			},
			restrict: "E",
			replace: true,
			templateUrl: "board/categories/category-directive/category-directive.html",
			controller: "kbCategoryController"
		};
	});

	module.controller("kbCategoryController", ["$scope", "boardAPI", "$log", function($scope, boardAPI, $log) {
		$scope.deleteCategoryLocally = function(catId) {
			for (var i = 0; i < $scope.board.categories.length; i++) {
				if ($scope.board.categories[i]._id === catId) {
					$scope.board.categories.splice(i, 1);
				}
			}
		};

		$scope.deleteCategory = function(catId) {
			console.log("ping");
			boardAPI
				.deleteCategory($scope.board._id, catId)
				.then(function(res) {
					$scope.deleteCategoryLocally(catId);
				}, function(err) {
					$log.error(err);
				});
		};
	}]);
})();
