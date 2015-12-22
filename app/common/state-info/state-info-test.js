(function() {
	"use strict";

	describe("stateInfoCtrl", function() {
		var $scope;

		beforeEach(module("stateInfoModule"));
		beforeEach(inject(function($controller) {
			$scope = {};
			$controller("stateInfoCtrl", {
				$scope: $scope
			});
		}));

		describe("$scope.alerts", function() {
			it("exists", function() {
				expect($scope.alerts).toBeDefined();
			});

			it("is an empty array", function() {
				expect($scope.alerts).toEqual([]);
			});
		});

		describe("$scope.closeAlert()", function() {
			it("exists", function() {
				expect($scope.closeAlert).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.closeAlert).toEqual("function");
			});

			it("closes an alert by removing it from the $scope.alerts array", function() {
				$scope.alerts = [1, 2];
				$scope.closeAlert(0);
				expect($scope.alerts).toEqual([2]);
			});
		});
	});
})();
