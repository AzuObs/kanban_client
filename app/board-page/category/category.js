(function() {
	"use strict";

	var module = angular.module("categoryModule", []);


	module.directive("kbCategory", function() {
		return {
			restrict: "E",
			replace: true,
			templateUrl: "app/board-page/category/category-directive.html"
		};
	});


	module.controller("categoryCtrl", ["$scope", "$log", "boardAPI", function($scope, $log, boardAPI) {

		$scope.createCategory = function(name, keyEvent) {
			if (!keyEvent || keyEvent.which === 13) {
				$scope.newCat = "";

				boardAPI
					.createCategory($scope.board._id, name, $scope.board.categories.length)
					.then(function(res) {
						$scope.board.categories.push(res);
					}, function(err) {
						$log.log(err);
					});
			}
		};

		$scope.deleteCategory = function(catId) {
			boardAPI
				.deleteCategory($scope.board._id, catId)
				.then(function(res) {
					for (var i = 0; i < $scope.board.categories.length; i++) {
						if ($scope.board.categories[i]._id === catId) {
							$scope.board.categories.splice(i, 1);
						}
					}
				}, function(err) {
					$log.log(err);
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
