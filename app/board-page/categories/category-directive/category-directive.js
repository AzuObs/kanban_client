(function() {
	"use strict";

	var module = angular.module("categoryDirectiveModule", []);

	module.directive("kbCategory", function() {
		return {
			restrict: "E",
			replace: true,
			templateUrl: "app/board-page/categories/category-directive/category-directive.html"
		};
	});

})();
