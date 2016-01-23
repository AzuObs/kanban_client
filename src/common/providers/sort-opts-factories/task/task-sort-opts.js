(function() {
	"use strict";

	var module = angular.module("TaskSortOptsModule", ["boardFactoryModule"]);

	module.factory("TaskSortOpts", ["boardFactory", function(boardFactory) {
		return function() {
			return {
				appendTo: "body",
				cursor: "move",
				connectWith: ".task-list",
				helper: "clone",
				horizontal: false,
				opacity: 0.4,
				tolerance: "pointer",
				stop: function(e, ui) {
					boardFactory.updateBoard();
				}
			};
		};
	}]);
})();
