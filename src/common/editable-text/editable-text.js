(function() {
	"use strict";

	var module = angular.module("editableTextDirectiveModule", []);

	module.directive("editableText", function() {
		var directiveDefinition = {
			scope: {
				text: "=editableText",
				isEditing: "=isEditing",
				update: "&update"
			},
			restrict: "A",
			transclude: true,
			templateUrl: "common/editable-text/editable-text.html",
			link: function(scope, elem, attr) {
				scope.setEditing = function(value, e) {
					if (!e) {
						scope.isEditing = value;
					} else if (!angular.element(e.relatedTarget).hasClass("edit-text-toggle")) {
						scope.isEditing = value;
					}
				};

				scope.startEditing = function() {
					setTimeout(function() {
						elem.find("input").focus();
					}, 0);
				};

				scope.stopEditing = function() {
					scope.update();
				};

				scope.validate = function(e) {
					if (e.type === "keypress" && e.which === 13) {
						scope.setEditing(false);
					}
				};

				var unregisterWatch = scope.$watch("isEditing", function(newV, oldV) {
					if (newV) {
						scope.startEditing();
					} else {
						scope.stopEditing();
					}
				});

				scope.$on("$destroy", function() {
					unregisterWatch();
				});
			}
		};

		return directiveDefinition;
	});

})();
