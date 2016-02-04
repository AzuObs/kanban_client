(function() {
	"use strict";

	var PageObject;

	PageObject = function() {
		this.init = function() {
			browser.get("http://localhost:3000/src/#/kanban/error");
		};

		this.isPresent = function() {
			return $(".error-page-container").isPresent();
		};

		this.imgIsPresent = function() {
			return $(".error-page-img").isPresent();
		};

		this.bodyIsPresent = function() {
			return $(".error-page-body").isPresent();
		};

		this.getTitle = function() {
			return $(".error-page-body h3").getText();
		};

		this.getRedirectLink = function() {
			return $(".redirect").getText();
		};

		this.clickRedirectLink = function() {
			return $(".redirect").click();
		};
	};

	module.exports = PageObject;

})();
