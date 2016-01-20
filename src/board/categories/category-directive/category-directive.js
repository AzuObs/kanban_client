(function() {
	"use strict";

	var module = angular.module("categoryDirectiveModule", ["ui.router", "serverAPIModule"]);

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

	module.controller("kbCategoryController", ["$scope", "serverAPI", "$log", function($scope, serverAPI, $log) {
		$scope.deleteCategoryLocally = function(catId) {
			for (var i = 0; i < $scope.board.categories.length; i++) {
				if ($scope.board.categories[i]._id === catId) {
					$scope.board.categories.splice(i, 1);
				}
			}
		};

		$scope.deleteCategory = function(catId) {
			serverAPI
				.deleteCategory($scope.board._id, catId)
				.then(function(res) {
					$scope.deleteCategoryLocally(catId);
				}, function(err) {
					$log.error(err);
				});
		};
	}]);
})();
