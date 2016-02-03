(function() {
	"use strict";

	// because of the ui-heavy nature of this factory, the sort options are best tested in protractor
	describe("CategorySortOpts", function() {
		var CategorySortOpts;

		beforeEach(function() {
			module("CategorySortOptsModule");
			inject(function(_CategorySortOpts_) {
				CategorySortOpts = _CategorySortOpts_;
			});
		});

		it("is defined", function() {
			expect(CategorySortOpts).toBeDefined();
		});

		it("is a constructor function", function() {
			expect(typeof CategorySortOpts).toEqual("function");
		});

		it("returns an object", function() {
			var sortOpts = new CategorySortOpts();
			expect(Object.prototype.toString.call(sortOpts)).toEqual("[object Object]");
		});

		it("calls updateBoard when sort is complete", inject(function(boardFactory) {
			var sortOpts, called;
			sortOpts = new CategorySortOpts();
			called = false;
			spyOn(boardFactory, "updateBoard").and.callFake(function() {
				called = true;
			});

			sortOpts.stop();
			expect(called).toEqual(true);
		}));
	});
})();
