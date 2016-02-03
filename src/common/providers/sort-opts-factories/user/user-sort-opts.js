(function() {
	"use strict";


	var module = angular.module("UserSortOptsModule", ["boardFactoryModule"]);


	module.factory("UserSortOpts", ["$log", "boardFactory", function($log, boardFactory) {
		var USER_SELECTION_HEIGHT = 150;
		var showUserLists = {
			value: false
		};

		return function(optionalStopFn) {
			return {
				getShowUserLists: function() {
					return showUserLists;
				},
				appendTo: "body",
				connectWith: ".user-list",
				cursor: "move",
				cursorAt: {
					left: 16,
					top: 16
				},
				helper: "clone",
				horizontal: true,
				scroll: false,
				tolerance: "pointer",
				activate: function(e, ui) {
					if (e.clientY < USER_SELECTION_HEIGHT) {
						$(ui.placeholder[0]).css("display", "none");
						$(ui.helper.prevObject[0]).css("display", "block");
					}
					$(ui.placeholder[0]).css("margin", "0px");
					showUserLists.value = true;
				},
				change: function(e, ui) {
					if (e.clientY > USER_SELECTION_HEIGHT) {
						$(ui.placeholder[0]).css("display", "block");
					} else {
						$(ui.placeholder[0]).css("display", "none");
					}
				},
				update: function(e, ui) {
					// cancel duplicates
					for (var i = 0; i < ui.item.sortable.droptargetModel.length; i++) {
						if (ui.item.sortable.droptargetModel[i]._id === ui.item.sortable.model._id) {
							$log.error("duplicate already exists in that list of task users");
							ui.item.sortable.cancel();
						}
					}
				},
				stop: function(e, ui) {
					showUserLists.value = false;
					if (optionalStopFn) {
						optionalStopFn();
					}
					boardFactory.updateBoard();
				}
			};
		};
	}]);
})();
