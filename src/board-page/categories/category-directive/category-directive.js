(function() {
	"use strict";

	var module = angular.module("categoryDirectiveModule", [
		"ui.router",
		"boardFactoryModule",
		"capitalizeFilterModule"
	]);


	module.directive("kbCategory", ["$filter", "boardFactory", function($filter,
		boardFactory) {
		var directiveDefinition = {
			scope: {
				category: "=ngModel"
			},
			restrict: "E",
			replace: true,
			templateUrl: "board-page/categories/category-directive/category-directive.html",
			link: function(scope, elem, attr) {
				scope.deleteCategory = function() {
					boardFactory.deleteCategory(scope.category);
				};

				scope.$on("$destroy", function() {
					// cleanup
				});

				scope.categoryName = $filter("capitalize")(scope.category.name);
			}
		};

		return directiveDefinition;
	}]);
})();
