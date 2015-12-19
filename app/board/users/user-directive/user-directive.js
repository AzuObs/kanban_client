(function() {
	"use strict";

	var module = angular.module("userDirectiveModule", ["ui.bootstrap"]);

	module.directive("kbUser", function() {
		return {
			restrict: "E",
			replace: true,
			templateUrl: "board/users/user-directive/user-directive.html"
		};
	});
})();
