(function() {
	"use strict";

	var module = angular.module("categoryModule", [
		"boardFactoryModule",
		"categoryDirectiveModule",
		"CategorySortOptsModule",
		"ui.bootstrap",
		"ui.sortable"
	]);

	module.controller("categoryCtrl", [
		"$scope", "boardFactory", "CategorySortOpts",
		function($scope, boardFactory, CategorySortOpts) {
			$scope.createCategory = function(e) {
				if (!e || (e.type === "keypress" && e.which === 13)) {
					boardFactory
						.createCategory($scope.newCat)
						.then(function() {
							$scope.resetNewCat();
						});
				}
			};

			$scope.resetNewCat = function() {
				$scope.newCat = "";
			};

			$scope.board = boardFactory.getBoardSync();
			$scope.newCat = "";
			$scope.categorySortOpts = new CategorySortOpts();
		}
	]);

})();
