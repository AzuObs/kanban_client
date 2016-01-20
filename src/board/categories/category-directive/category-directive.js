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
		$scope.deleteCategory = function(cat) {
			boardAPI.deleteCategory(cat);
		};
	}]);
})();
