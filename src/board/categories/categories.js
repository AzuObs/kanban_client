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
		"$scope", "$log", "boardFactory", "CategorySortOpts",
		function($scope, $log, boardFactory, CategorySortOpts) {

			$scope.createCategory = function(keyEvent) {
				if (!keyEvent || keyEvent.which === 13) {
					boardFactory.createCategory($scope.newCat);
					$scope.newCat = "";
				}
			};

			$scope.board = boardFactory.getBoardSync();
			$scope.categorySortOpts = new CategorySortOpts();
			$scope.newCat = "";
		}
	]);

})();
