(function() {
	"use strict";

	// because of the ui-heavy nature of this factory, the sort options are best tested in protractor
	describe("TaskSortOpts", function() {
		var TaskSortOpts;

		beforeEach(function() {
			module("TaskSortOptsModule");
			inject(function(_TaskSortOpts_) {
				TaskSortOpts = _TaskSortOpts_;
			});
		});

		it("is defined", function() {
			expect(TaskSortOpts).toBeDefined();
		});

		it("is a constructor function", function() {
			expect(typeof TaskSortOpts).toEqual("function");
		});

		it("returns an object", function() {
			var sortOpts = new TaskSortOpts();
			expect(Object.prototype.toString.call(sortOpts)).toEqual("[object Object]");
		});

		it("calls updateBoard when sort is complete", inject(function(boardFactory) {
			var sortOpts, called;
			sortOpts = new TaskSortOpts();
			called = false;
			spyOn(boardFactory, "updateBoard").and.callFake(function() {
				called = true;
			});

			sortOpts.stop();
			expect(called).toEqual(true);
		}));
	});
})();
