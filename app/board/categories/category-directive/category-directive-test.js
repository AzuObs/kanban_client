(function() {
	"use strict";

	describe("kbCategory directive", function() {
		var $scope, $compile;

		beforeEach(function() {
			module("categoryDirectiveModule");
			module("html2JsModule");

			inject(function($rootScope, _$compile_) {
				$scope = $rootScope.$new();
				$compile = _$compile_;
			});
		});

		it("is defined and is not empty", function() {
			var dom;

			$scope.$apply(function() {
				dom = $compile("<kb-category></kb-category>")($scope);
			});

			expect(dom.html().length).not.toEqual(0);
		});

		it("replaces the dom", function() {
			var dom;

			$scope.$apply(function() {
				dom = $compile("<kb-category></kb-category>")($scope);
			});

			expect(angular.element(dom).find("kb-category").length).toEqual(0);
		});

		it("is limited to be an element only", function() {
			var dom;

			$scope.$apply(function() {
				dom = $compile("<kb-category></kb-category>")($scope);
			});
			expect(dom.html().length).toBeGreaterThan(0);

			$scope.$apply(function() {
				dom = $compile("<div kb-category></div>")($scope);
			});
			expect(dom.html().length).toEqual(0);
		});

		it("contains a header section", function() {
			var dom;

			$scope.$apply(function() {
				dom = $compile("<kb-category></kb-category>")($scope);
			});

			expect(dom.find(".category-header").length).toEqual(1);
		});

		it("contains a close button", function() {
			var dom;

			$scope.$apply(function() {
				dom = $compile("<kb-category></kb-category>")($scope);
			});

			expect(dom.find("button.close-category").length).toEqual(1);
		});

		it("contains a task view", function() {
			var dom;

			$scope.$apply(function() {
				dom = $compile("<kb-category></kb-category>")($scope);
			});

			expect(dom.find(".task-view").length).toEqual(1);
		});
	});
})();
