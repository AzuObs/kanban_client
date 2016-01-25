(function() {
	"use strict";

	var module = angular.module("copyChildMinHeightDirectiveModule", []);

	// expects element to only have one child "container/wrapper" element
	module.directive("copyChildMinHeight", [function() {
		var directiveDefinition = {
			restrict: "A",
			link: function(scope, elem, attr) {
				var childElem, childMinHeight;
				childElem = angular.element(elem).children()[0];
				childMinHeight = angular.element(childElem).css("min-height");
				angular.element(elem).css("min-height", childMinHeight);
			}
		};

		return directiveDefinition;
	}]);
})();
