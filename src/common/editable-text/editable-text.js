(function() {
	"use strict";


	/*
	 * assign logic to execute on update	
	 * toggle editing on / off by assigned isEditing true or false
	 * prevent default ng-blur behavior by adding class 'edit-text-toggle' to an any element
	 *
	 *
	 * ex: 
	 * 
	 * <h5 editable-text='title' update='callToUpdateTitleOnTheServer()' is-editing='isEditingTitle'>
	 * {{title}}</h5> 
	 * <button class='edit-text-toggle' ng-click='toggleIsEditingTitle()'>
	 */


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
