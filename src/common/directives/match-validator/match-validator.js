(function() {
	"use strict";

	var module = angular.module("matchValidatorDirectiveModule", []);


	// This directive is in charge of matching the input passed to it via the scope
	// in the context of a form validator
	module.directive("matchValidator", function() {
		var directiveDefinition = {
			restrict: "A",
			scope: {
				inputToMatch: "=matchValidator"
			},
			template: "",
			require: "ngModel",
			link: function(scope, elem, attr, ctrl) {
				ctrl.$validators.match = function(modelValue, viewValue) {
					if (viewValue === scope.inputToMatch) {
						return true;
					}

					return false;
				};
			}
		};

		return directiveDefinition;
	});


})();
