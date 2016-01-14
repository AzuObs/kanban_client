(function() {
	"use strict";

	var pageObject, AboutPageObject;

	AboutPageObject = require(process.cwd() + "/e2e/suites/about/about-page-object.js");
	pageObject = new AboutPageObject();

	describe("The about page", function() {
		beforeEach(function() {
			pageObject.get();
		});

		it("is present", function() {
			expect(pageObject.isPresent()).toEqual(true);
		});

		it("has a fancy scrollbar", function() {
			expect(pageObject.hasFancyScrollbar()).toEqual(true);
		});

		it("explains Kanban", function() {
			expect(pageObject.explainsKanban()).toEqual(true);
		});

		it("has a video link to explain the Kanban", function() {
			expect(pageObject.hasYoutubeKanbanLink()).toEqual(true);
		});

		it("has a list of resources used", function() {
			expect(pageObject.hasResourcesList()).toEqual(true);
		});

		it("has a link to the project's repository", function() {
			expect(pageObject.linksToRepo()).toEqual(true);
		});
	});
})();
