(function() {
	"use strict";

	var module = angular.module("categoryDirectiveModule", []);

	module.directive("kbCategory", function() {
		return {
			restrict: "E",
			replace: true,
			templateUrl: "board/categories/category-directive/category-directive.html"
		};
	});

})();
