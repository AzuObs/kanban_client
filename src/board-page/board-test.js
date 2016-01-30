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


		describe("boardCtrl", function() {
			describe("$scope.board", function() {
				it("is defined", function() {
					expect($scope.board).toBeDefined();
				});

				it("is an object", function() {
					expect(Object.prototype.toString.call($scope.board)).toEqual("[object Object]");
				});

				it("is a copy of the board injected into the controller", function() {
					expect($scope.board).toEqual(board);
				});
			});
		});
	});
})();
