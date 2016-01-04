(function() {
	"use strict";

	var NavbarObject = function() {
		var title = element(by.css(".app-title"));
		var dropdown = element(by.css("li[dropdown]"));
		var dropdownLinks = element.all(by.repeater("link in navLinks"));

		this.get = function() {
			browser.get("http://localhost:3000/app/#/kanban/identity");
		};

		this.getTitle = function() {
			return title.getText();
		};

		this.hasTitle = function() {
			return title.isPresent();
		};

		this.hasDropdownMenu = function() {
			return dropdown.isPresent();
		};

		this.getDropdownLinksCount = function() {
			return dropdownLinks.count();
		};

		this.getDropdownLinks = function() {
			return dropDownLinks;
		};

		this.clickDropdown = function() {
			return dropdown.click();
		};

		this.getLinkName = function(n) {
			return dropdownLinks.get(n).getText();
		};

		this.clickLink = function(n) {
			return dropdownLinks.get(n).click();
		};
	};

	module.exports = NavbarObject;

})();
