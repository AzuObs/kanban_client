(function() {
	"use strict";

	var module = angular.module("editableTitleDirectiveModule", []);

	//<h5 editable-title>Hello World</h5> 

	module.directive("editableTitle", function() {
		var directiveDefinition = {
			scope: {
				isEditing: "=isEditing"
			},
			restrict: "A",
			transclude: true,
			controller: "editableTitleCtrl",
			templateUrl: "common/editable-title/editable-title.html"
		};

		return directiveDefinition;
	});

	module.directive("editableTitleCtrl", ["$scope", function($scope) {

	}]);
})();
