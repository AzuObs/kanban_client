(function() {
	"use strict";

	var module = angular.module("categoryModule", ["boardAPIModule", "categoryDirectiveModule", "ui.bootstrap", "ui.sortable"]);


	module.controller("categoryCtrl", ["$scope", "$log", "boardAPI", function($scope, $log, boardAPI) {
		$scope.newCat = "";

		$scope.createCategory = function(keyEvent) {
			if (!keyEvent || keyEvent.which === 13) {
				boardAPI
					.createCategory($scope.board._id, $scope.newCat)
					.then(function(res) {
						$scope.board.categories.push(res);
					}, function(err) {
						$log.error(err);
					});

				$scope.newCat = "";
			}
		};

		$scope.deleteLocalCategory = function(catId) {
			for (var i = 0; i < $scope.board.categories.length; i++) {
				if ($scope.board.categories[i]._id === catId) {
					$scope.board.categories.splice(i, 1);
				}
			}
		};

		$scope.deleteCategory = function(catId) {
			boardAPI
				.deleteCategory($scope.board._id, catId)
				.then(function(res) {
					$scope.deleteLocalCategory(catId);
				}, function(err) {
					$log.error(err);
				});
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
				$scope.updateBoard();
			}
		};
	}]);

})();
