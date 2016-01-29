(function() {
	"use strict";

	var module = angular.module("categoryDirectiveModule", [
		"ui.router",
		"boardFactoryModule",
		"capitalizeFilterModule"
	]);


	module.directive("kbCategory", function() {
		var directiveDefinition = {
			scope: {
				category: "=ngModel"
			},
			restrict: "E",
			replace: true,
			templateUrl: "board-page/categories/category-directive/category-directive.html",
			controller: "kbCategoryController",
			link: function(scope, elem, attr) {
				scope.$on("$destroy", function() {
					// cleanup
				});
			}
		};

		return directiveDefinition;
	});


	module.controller("kbCategoryController", [
		"$scope", "boardFactory", "$filter",
		function($scope, boardFactory, $filter) {
			$scope.deleteCategory = function(cat) {
				boardFactory.deleteCategory(cat);
			};

			$scope.categoryName = $filter("capitalize")($scope.category.name);
		}
	]);
})();
