(function() {
	"use strict";

	var module = angular.module("userDirectiveModule", ["ui.bootstrap"]);

	module.directive("kbUser", function() {

		//best practice
		var directiveDefinitionObject = {
			restrict: "E",
			scope: {
				user: "=ngModel"
			},
			replace: true,
			templateUrl: "board/users/user-directive/user-directive.html",
			link: function(scope, elem, attr) {

				//best practice
				scope.$on("$destroy", function() {

				});
			}
		};

		return directiveDefinitionObject;
	});
})();
