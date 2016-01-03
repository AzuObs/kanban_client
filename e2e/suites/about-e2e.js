(function() {
	"use strict";

	var aboutPage, AboutPageObject;


	AboutPageObject = function() {
		var aboutPage, aboutPageUrl, constants;

		aboutPageUrl = "http://localhost:3000/app/#/kanban/about";
		aboutPage = $(".about-container");

		constants = {
			KB_EXPLANATION_TITLE: /what is a kanban?/i,
			KB_EXPLANATION_YOUTUBE: "https://www.youtube.com/watch?v=R8dYLbJiTUE",
			REPO_URL: "https://github.com/AzuObs/To-Do-App"
		};

		this.get = function() {
			browser.get(aboutPageUrl);
		};

		this.isPresent = function() {
			return aboutPage.isPresent();
		};

		this.hasFancyScrollbar = function() {
			return aboutPage.getAttribute("class").then(function(res) {
				return res.match(/ui-fancy-scrollbar/)[0] === "ui-fancy-scrollbar";
			});
		};

		this.explainsKanban = function() {
			return aboutPage.getText().then(function(res) {
				return !!res.match(constants.KB_EXPLANATION_TITLE)[0].length;
			});
		};

		this.hasYoutubeKanbanLink = function() {
			return aboutPage.element(by.css("a[href='" + constants.KB_EXPLANATION_YOUTUBE + "']")).isPresent();
		};

		this.hasResourcesList = function() {
			return !!aboutPage.all(by.repeater("resource in resources")).count();
		};

		this.linksToRepo = function() {
			return aboutPage.element(by.css("a[href='" + constants.REPO_URL + "']")).isPresent();
		};
	};


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
