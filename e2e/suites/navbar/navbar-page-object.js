(function() {
	"use strict";

	var NavbarObject = function() {

		this.get = function() {
			browser.get("http://localhost:3000/src/#/identity");
		};


		this.getTitle = function() {
			return $(".navigation-title h1").getText().then(function(title) {
				return $(".navigation-title h3").getText().then(function(subtitle) {
					return (title + " " + subtitle);
				});
			});
		};


		this.hasTitle = function() {
			return element(by.css(".navigation-title")).isPresent();
		};


		this.clickExpandMenuToggle = function() {
			$(".expandable-text-toggle").click();
		};


		this.hasMenu = function() {
			return $(".navigation-menu").isPresent();
		};


		this.getMenuLinksCount = function() {
			return element.all(by.repeater("link in menuLinks")).count();
		};


		this.getLinkName = function(n) {
			return element.all(by.repeater("link in menuLinks")).get(n).getText();
		};

		this.clickLink = function(n) {
			return element.all(by.repeater("link in menuLinks")).get(n).click();
		};
	};

	module.exports = NavbarObject;

})();
