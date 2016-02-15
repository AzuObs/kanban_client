(function() {
	"use strict";

	var module = angular.module("copyChildMinHeightDirectiveModule", []);

	// expects element to only have one child "container/wrapper" element
	module.directive("copyChildMinHeight", [function() {
		var directiveDefinition = {
			restrict: "A",
			scope: true,
			link: function(scope, elem, attr) {
				scope.setMinHeight = function(height) {
					elem.css("min-height", height);
				};

				scope.childElem = angular.element(elem).children()[0];
				scope.childMinHeight = angular.element(scope.childElem).css("min-height");
				scope.setMinHeight(scope.childMinHeight);
			}
		};

		return directiveDefinition;
	}]);
})();
