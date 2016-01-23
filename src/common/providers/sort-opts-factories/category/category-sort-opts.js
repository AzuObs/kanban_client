(function() {
	"use strict";

	var module = angular.module("CategorySortOptsModule", [
		"boardFactoryModule"
	]);

	module.factory("CategorySortOpts", ["boardFactory", function(boardFactory) {
		return function() {
			return {
				horizontal: true,
				tolerance: "pointer",
				distance: 1,
				cursor: "move",
				opacity: 0.3,
				scroll: true,
				scrollSensitivity: 20,
				activate: function(e, ui) {
					//fix height of placeholder
					var height = $(ui.item[0].children[0]).css("height");
					$(ui.placeholder[0]).css("height", height);
				},
				stop: function(e, ui) {
					boardFactory.updateBoard();
				}
			};
		};
	}]);
})();
