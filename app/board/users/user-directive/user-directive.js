(function() {
	"use strict";

	var module = angular.module("userDirectiveModule", []);

	module.directive("kbUser", function() {
		return {
			restrict: "E",
			replace: true,
			templateUrl: "app/board/users/user-directive/user-directive.html"
		};
	});
})();
