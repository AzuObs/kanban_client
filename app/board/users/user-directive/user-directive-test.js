(function() {
	"use strict";

	describe("kb-user directive", function() {
		var $compile, $rootScope;

		beforeEach(function() {
			module("userDirectiveModule");
			module("html2JsModule");

			inject(function(_$compile_, _$rootScope_, $templateCache) {
				$compile = _$compile_;
				$rootScope = _$rootScope_;
			});
		});

		it("is defined and is not empty", function() {
			var element;

			$rootScope.$apply(function() {
				element = $compile("<div><kb-user></kb-user></div>")($rootScope);
			});

			expect(element.html()).not.toEqual("<kb-user></kb-user>");
		});

		it("is restricted to be an element only", function() {
			var element;

			$rootScope.$apply(function() {
				element = $compile("<div><span kb-user=\"\"></span></div>")($rootScope);
			});

			expect(element.html()).toEqual("<span kb-user=\"\"></span>");


			$rootScope.$apply(function() {
				element = $compile("<div><kb-user></kb-user></div>")($rootScope);
			});

			expect(element.html()).not.toEqual("<kb-user></kb-user>");
		});

		it("doesn't transclude the DOM", function() {
			var element, text;

			$rootScope.$apply(function() {
				element = $compile("<kb-user>foobar</kb-user>")($rootScope);
			});

			text = element.text();
			expect(text.search("foobar")).toEqual(-1);
		});

		it("replaces it's element wit it's own html", function() {
			var element;

			$rootScope.$apply(function() {
				element = $compile("<div><kb-user></kb-user></div>")($rootScope);
			});

			expect(element.find("kb-user").length).toEqual(0);
		});

		it("contains an img of the user inside a .user-container", function() {
			var element;

			$rootScope.$apply(function() {
				element = $compile("<kb-user></kb-user>")($rootScope);
			});

			expect(element.find("img").length).toEqual(1);
		});
	});
})();
