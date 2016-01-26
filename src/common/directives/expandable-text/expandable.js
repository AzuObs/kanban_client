(function() {
	"use strict";

	var module = angular.module("expandableTextDirectiveModule", []);

	// can be styled via .expandable-text-toggle and .expandable-text-transclude
	module.directive("expandableText", [function() {
		var directiveDefinition = {
			restrict: "AE",
			scope: {
				isExpanded: "=expanded"
			},
			transclude: true,
			templateUrl: "common/directives/expandable-text/expandable.html",
			link: function(scope, elem, attr) {
				scope.toggleIsExpanded = function() {
					scope.isExpanded = !scope.isExpanded;
				};
			}
		};

		return directiveDefinition;
	}]);

})();
