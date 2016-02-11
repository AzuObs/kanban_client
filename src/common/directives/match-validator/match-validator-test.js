(function() {
	"use strict";

	describe("matchValidator directive", function() {
		var $scope, scope, dom;

		beforeEach(function() {
			module("matchValidatorDirectiveModule");
			inject(function($rootScope, $compile) {
				$scope = $rootScope.$new();

				dom = angular.element(
					"<form name='form'>" +
					"<input name='original' type='text' ng-model='original'>" +
					"<input name='copy' type='text' ng-model='copy' match-validator='original'>" +
					"</form>"
				);
				$scope.original = "original";
				$scope.copy = "copy";
				$scope.$apply(function() {
					dom = $compile(dom)($scope);
				});

				var matchInput = angular.element(dom).find(
					"input[match-validator='original']");
				scope = angular.element(matchInput).isolateScope();
			});

		});

		it("compiles", function() {
			expect(dom.find("input[match-validator='original']").length).toEqual(1);
		});

		it("has a scope", function() {
			expect(scope).toBeDefined();
		});


		it(
			"sets the form input to $invalid if it does not match the original input",
			function() {
				$scope.$apply(function() {
					$scope.original = "original";
					$scope.copy = "copy";
				});

				expect(dom.scope().form.copy.$invalid).toEqual(true);
				expect(dom.scope().form.copy.$error.match).toBeDefined();
				expect(dom.scope().form.copy.$error.match).toEqual(true);
			});


		it("sets the form input to $valid if it does match the original input",
			function() {
				$scope.$apply(function() {
					$scope.original = "original";
					$scope.copy = "original";
				});

				expect(dom.scope().form.copy.$valid).toEqual(true);
				expect(dom.scope().form.copy.$error.match).toBeUndefined();
			});

		describe("scope.inputToMatch", function() {
			it("is defined", function() {
				expect(scope.inputToMatch).toBeDefined();
			});

			it("is a string", function() {
				expect(typeof scope.inputToMatch).toEqual("string");
			});

			it("is equal to $scope.original", function() {
				$scope.$apply(function() {
					$scope.original = "hello";
				});
				expect(scope.inputToMatch).toEqual($scope.original);
			});
		});
	});
})();
