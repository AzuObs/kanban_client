(function() {
	"use strict";

	var module = angular.module("expandableTextDirectiveModule", []);

	// can be styled via .expandable-text-toggle and .expandable-text-transclude
	module.directive("expandableText", [function() {
		var directiveDefinition = {
			restrict: "AE",
			transclude: true,
			templateUrl: "common/directives/expandable-text/expandable.html",
			link: function(scope, elem, attr) {
				scope.toggleIsExpanded = function() {
					scope.isExpanded = !scope.isExpanded;
				};

				scope.isExpanded = true;
			}
		};

		return directiveDefinition;
	}]);

})();
