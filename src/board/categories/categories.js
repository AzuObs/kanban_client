(function() {
	"use strict";

	var module = angular.module("categoryModule", [
		"boardFactoryModule", "categoryDirectiveModule", "ui.bootstrap", "ui.sortable"
	]);

	module.controller("categoryCtrl", [
		"$scope", "$log", "boardFactory",
		function($scope, $log, boardFactory) {
			$scope.board = boardFactory.getBoardSync();
			$scope.newCat = "";

			$scope.createCategory = function(keyEvent) {
				if (!keyEvent || keyEvent.which === 13) {
					boardFactory.createCategory($scope.newCat);
					$scope.newCat = "";
				}
			};

			$scope.categorySortOpts = {
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

		}
	]);

})();
