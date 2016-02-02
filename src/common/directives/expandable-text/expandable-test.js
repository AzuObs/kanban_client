(function() {
	"use strict";

	describe("expandableText directive", function() {
		var scope, elem;

		beforeEach(function() {
			module("expandableTextDirectiveModule");
			module("html2JsModule");

			inject(function($compile, $rootScope) {
				scope = $rootScope.$new();
				elem = "<div expandable-text>hello</div>";

				scope.$apply(function() {
					elem = $compile(elem)(scope);
				});
				scope = elem.scope();
			});
		});


		describe("scope.toggleIsExpanded", function() {
			it("is defined", function() {
				expect(scope.toggleIsExpanded).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof scope.toggleIsExpanded).toEqual("function");
			});

			it("flips toggleIsExpanded", function() {
				expect(scope.isExpanded).toEqual(true);
				scope.toggleIsExpanded();
				expect(scope.isExpanded).toEqual(false);

				expect(scope.isExpanded).toEqual(false);
				scope.toggleIsExpanded();
				expect(scope.isExpanded).toEqual(true);
			});
		});


		describe("scope.isExpanded", function() {
			it("is defined", function() {
				expect(scope.isExpanded).toBeDefined();
			});

			it("is a boolean", function() {
				expect(typeof scope.isExpanded).toEqual("boolean");
			});

			it("is true", function() {
				expect(scope.isExpanded).toEqual(true);
			});
		});
	});
})();
