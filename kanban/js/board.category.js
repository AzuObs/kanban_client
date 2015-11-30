(function() {
	"use strict";

	var module = angular.module("kanbanCategoryModule", []);


	module.directive("kbCategory", function() {
		return {
			restrict: "E",
			replace: true,
			templateUrl: "kanban/html/board.category.directive.html"
		};
	});


	module.controller("kanbanCategoryCtrl", ["$scope", "$log", "APIService", function($scope, $log, APIService) {

		$scope.createCategory = function(name, keyEvent) {
			if (!keyEvent || keyEvent.which === 13) {
				$scope.newCat = "";

				APIService
					.createCategory($scope.board._id, name, $scope.board.categories.length)
					.then(function(res) {
						$scope.board.categories.push(res);
					}, function(err) {
						$log.log(err);
					});
			}
		};

		$scope.deleteCategory = function(catId) {
			APIService
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
			stop: function(e, ui) {
				$scope.updateBoard();
			},
			horizontal: true,
			tolerance: "pointer",
			distance: 1,
			cursor: "move",
			opacity: 0.3,
			scroll: true,
			scrollSensitivity: 20
		};
	}]);

})();
