(function() {
	"use strict";


	describe("boardModule", function() {
		var $scope, board;

		beforeEach(function() {
			module("boardModule");
			inject(function($rootScope, $controller) {
				$scope = $rootScope.$new();
				board = {
					name: "foobar"
				};
				$controller("boardCtrl", {
					$scope: $scope,
					board: board
				});
			});
		});
	});
})();
