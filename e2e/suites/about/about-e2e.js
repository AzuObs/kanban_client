(function() {
	"use strict";

	var aboutPage, AboutPageObject;

	AboutPageObject = require(process.cwd() + "/e2e/suites/about/about-page-object.js");

	describe("The about page", function() {

		beforeEach(function() {
			aboutPage = new AboutPageObject();
			aboutPage.get();
		});

		it("is present", function() {
			expect(aboutPage.isPresent()).toEqual(true);
		});

		it("sets the website's title to Kanban - About", function() {

		});

		it("has a fancy scrollbar", function() {
			expect(aboutPage.hasFancyScrollbar()).toEqual(true);
		});

		it("explains Kanban", function() {
			expect(aboutPage.explainsKanban()).toEqual(true);
		});

		it("has a video link to explain the Kanban", function() {
			expect(aboutPage.hasYoutubeKanbanLink()).toEqual(true);
		});

		it("has a list of resources used", function() {
			expect(aboutPage.hasResourcesList()).toEqual(true);
		});

		it("has a link to the project's repository", function() {
			expect(aboutPage.linksToRepo()).toEqual(true);
		});
	});
})();
