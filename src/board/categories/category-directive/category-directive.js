(function() {
	"use strict";

	var module = angular.module("categoryDirectiveModule", [
		"ui.router", "boardAPIModule"
	]);


	module.directive("kbCategory", function() {
		var directiveDefinition = {
			scope: {
				category: "=ngModel"
			},
			restrict: "E",
			replace: true,
			templateUrl: "board/categories/category-directive/category-directive.html",
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
		"$scope", "boardAPI",
		function($scope, boardAPI) {
			$scope.deleteCategory = function(cat) {
				boardAPI.deleteCategory(cat);
			};
		}
	]);
})();
