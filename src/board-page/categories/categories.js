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
			$scope.createCategory = function() {
				boardFactory
					.createCategory($scope.newCat)
					.then(function() {
						$scope.resetNewCat();
					});
			};

			$scope.resetNewCat = function() {
				$scope.newCat = "";
			};

			$scope.newCat = "";
			$scope.board = boardFactory.getBoardSync();
			$scope.categorySortOpts = new CategorySortOpts();
		}
	]);

})();
