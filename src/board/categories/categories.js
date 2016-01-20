(function() {
	"use strict";

	var module = angular.module("categoryModule", ["serverAPIModule", "categoryDirectiveModule", "ui.bootstrap", "ui.sortable"]);

	module.controller("categoryCtrl", ["$scope", "$log", "serverAPI", function($scope, $log, serverAPI) {
		$scope.newCat = "";

		$scope.createCategory = function(keyEvent) {
			if (!keyEvent || keyEvent.which === 13) {
				serverAPI
					.createCategory($scope.board._id, $scope.newCat)
					.then(function(res) {
						$scope.board.categories.push(res);
					}, function(err) {
						$log.error(err);
					});

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
				$scope.board.update();
			}
		};

	}]);

})();
