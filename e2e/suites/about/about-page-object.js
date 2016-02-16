(function() {
	"use strict";

	var AboutPageObject = function() {
		var aboutPage, config;

		aboutPage = $(".about-container");

		config = {
			aboutPageUrl: "http://localhost:3000/src/#/about",
			KB_EXPLANATION_TITLE: /what is a kanban?/i,
			KB_EXPLANATION_YOUTUBE: "https://www.youtube.com/watch?v=R8dYLbJiTUE",
			REPO_URL: "https://github.com/AzuObs/To-Do-App"
		};

		this.get = function() {
			browser.get(config.aboutPageUrl);
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
				return !!res.match(config.KB_EXPLANATION_TITLE)[0].length;
			});
		};

		this.hasYoutubeKanbanLink = function() {
			return aboutPage.element(by.css("a[href='" + config.KB_EXPLANATION_YOUTUBE + "']")).isPresent();
		};

		this.hasResourcesList = function() {
			return !!aboutPage.all(by.repeater("resource in resources")).count();
		};

		this.linksToRepo = function() {
			return aboutPage.element(by.css("a[href='" + config.REPO_URL + "']")).isPresent();
		};
	};

	module.exports = AboutPageObject;
})();
