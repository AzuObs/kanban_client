(function() {
	"use strict";

	var module = angular.module("categoryDirectiveModule", [
		"ui.router", "boardFactoryModule"
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
		"$scope", "boardFactory",
		function($scope, boardFactory) {
			$scope.deleteCategory = function(cat) {
				boardFactory.deleteCategory(cat);
			};
		}
	]);
})();
