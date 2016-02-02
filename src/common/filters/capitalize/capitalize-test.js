(function() {
	"use strict";

	describe("capitalize Filter", function() {
		var $filter;

		beforeEach(function() {
			module("capitalizeFilterModule");
			inject(function(_$filter_) {
				$filter = _$filter_;
			});
		});

		describe("should capitalize the first letter of each word", function() {
			it("ex: 'foo' === 'Foo'", function() {
				var example = "foo";
				example = $filter("capitalize")(example);
				expect(example).toEqual("Foo");
			});

			it("ex: 'foo foo' === 'Foo Foo'", function() {
				var example = "foo foo";
				example = $filter("capitalize")(example);
				expect(example).toEqual("Foo Foo");
			});
		});

		describe("should ignore one letter words", function() {
			it("ex: 'a' === 'a'", function() {
				var example = "a";
				example = $filter("capitalize")(example);
				expect(example).toEqual("a");
			});

			it("ex: 'foo a foo' === 'Foo a Foo'", function() {
				var example = "foo a foo";
				example = $filter("capitalize")(example);
				expect(example).toEqual("Foo a Foo");
			});
		});
	});
})();
