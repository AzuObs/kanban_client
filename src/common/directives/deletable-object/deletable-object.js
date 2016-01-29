(function() {
	"use strict";

	var module = angular.module("deletableObjectDirectiveModule", []);

	// attributes is-deleting and is-disabled are optional
	module.directive("deletableObject", ["$log", function($log) {

		var directiveDefinition = {
			restrict: "AE",
			scope: {
				objectName: "@",
				objectType: "@",
				isDeleting: "=",
				isDisabled: "@",
				deleteFn: "&"
			},
			replace: true,
			templateUrl: "common/directives/deletable-object/deletable-object.html",
			link: function(scope, elem, attr) {

				scope.toggleDeleting = function() {
					scope.isDeleting = !scope.isDeleting;
					scope.repeatObjectName = "";

					setTimeout(function() {
						angular.element(elem).find("input").focus();
					}, 0);
				};

				scope.stopDeleting = function(e) {
					scope.repeatObjectName = "";

					if (!angular.element(e.relatedTarget).hasClass("deletable-object-toggle")) {
						scope.isDeleting = false;
					}
				};

				scope.deleteObject = function(e) {
					if (e.type === "keypress" && e.which === 13) {
						if (scope.objectName === scope.repeatObjectName) {
							scope.stopDeleting(e);
							scope.deleteFn();
						} else {
							$log.error("invalid input; does not match " + scope.objectType + "'s name");
						}
					}
				};

				scope.$on("$destroy", function() {
					// 
				});

				scope.isDeleting = scope.isDeleting || false;
				scope.isDisabled = scope.isDisabled || false;
				scope.repeatObjectName = "";
			}
		};

		return directiveDefinition;
	}]);
})();
