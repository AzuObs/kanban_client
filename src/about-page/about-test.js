(function() {
	"use strict";

	describe("aboutModule", function() {
		describe("aboutCtrl", function() {
			var $scope;

			beforeEach(module("aboutModule"));
			beforeEach(inject(function($controller, $rootScope) {
				$scope = $rootScope.$new();
				$controller("aboutCtrl", {
					$scope: $scope
				});
			}));

			describe("$scope.resources", function() {
				it("is defined", function() {
					expect($scope.resources).toBeDefined();
				});

				it("is an array", function() {
					expect(Object.prototype.toString.call($scope.resources)).toEqual("[object Array]");
				});

				it("is not empty", function() {
					expect($scope.resources.length).toBeGreaterThan(0);
				});
			});
		});
	});
})();
