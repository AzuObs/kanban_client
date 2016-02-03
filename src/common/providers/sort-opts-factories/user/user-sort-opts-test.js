(function() {
	"use strict";

	// because of the ui-heavy nature of this factory, the sort options are best tested in protractor
	describe("UserSortOpts", function() {
		var UserSortOpts;

		beforeEach(function() {
			module("UserSortOptsModule");
			inject(function(_UserSortOpts_) {
				UserSortOpts = _UserSortOpts_;
			});
		});

		it("is defined", function() {
			expect(UserSortOpts).toBeDefined();
		});

		it("is a constructor function", function() {
			expect(typeof UserSortOpts).toEqual("function");
		});

		it("returns an object", function() {
			var sortOpts = new UserSortOpts();
			expect(Object.prototype.toString.call(sortOpts)).toEqual("[object Object]");
		});

		it("has a get 'showUserLists' function", function() {
			var sortOpts = new UserSortOpts();
			expect(sortOpts.getShowUserLists).toBeDefined();
			expect(sortOpts.getShowUserLists().value).toEqual(false);
		});

		it("calls updateBoard when sort is complete", inject(function(boardFactory) {
			var sortOpts, called;
			sortOpts = new UserSortOpts();
			called = false;
			spyOn(boardFactory, "updateBoard").and.callFake(function() {
				called = true;
			});

			sortOpts.stop();
			expect(called).toEqual(true);
		}));
	});
})();
