(function() {
	"use strict";

	var module = angular.module("categoryDirectiveModule", ["ui.router", "boardAPIModule"]);


	module.directive("kbCategory", function() {
		var directiveDefinition = {
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
		"$scope", "boardAPI", "$log",
		function($scope, boardAPI, $log) {
			$scope.deleteCategory = function(cat) {
				boardAPI.deleteCategory(cat);
			};
		}
	]);
})();
