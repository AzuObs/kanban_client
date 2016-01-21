(function() {
	"use strict";

	var module = angular.module("userDirectiveModule", ["ui.bootstrap"]);

	module.directive("kbUser", function() {
		var directiveDefinitionObject = {
			scope: {
				user: "=ngModel"
			},
			restrict: "E",
			replace: true,
			templateUrl: "board/users/user-directive/user-directive.html",
			link: function(scope, elem, attr) {
				scope.$on("$destroy", function() {
					// cleanup
				});
			}
		};

		return directiveDefinitionObject;
	});
})();
