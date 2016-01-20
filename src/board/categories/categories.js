(function() {
	"use strict";

	var module = angular.module("categoryModule", ["boardAPIModule", "categoryDirectiveModule", "ui.bootstrap", "ui.sortable"]);

	module.controller("categoryCtrl", ["$scope", "$log", "boardAPI", function($scope, $log, boardAPI) {
		$scope.newCat = "";

		$scope.createCategory = function(keyEvent) {
			if (!keyEvent || keyEvent.which === 13) {
				boardAPI.createCategory($scope.newCat);
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
				boardAPI.updateBoard();
			}
		};

	}]);

})();
