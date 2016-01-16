(function() {
	"use strict";

	var OauthPageObject = function() {
		var oauthPage = $(".oauth-container");

		this.get = function() {
			browser.get("http://localhost:3000/src/#/kanban/identity");
		};

		this.isPresent = function() {
			return oauthPage.isPresent();
		};

		this.hasFancyScrollbar = function() {
			return oauthPage.getAttribute("class").then(function(res) {
				return res.match(/ui-fancy-scrollbar/)[0] === "ui-fancy-scrollbar";
			});
		};

		this.hasLoginSection = function() {
			return oauthPage.element(by.className("login-container")).isPresent();
		};

		this.hasDemoCredentials = function() {
			return oauthPage.element(by.className("login-help-credentials")).isPresent();
		};

		this.hasPlaceholderUsername = function() {
			return oauthPage.element(by.css("input[placeholder='sheldon']")).isPresent();
		};

		this.hasPlaceholderPwd = function() {
			return oauthPage.element(by.css("input[placeholder='123']")).isPresent();
		};

		this.clickLogin = function() {
			return oauthPage.element(by.css("button[ng-click='authenticate()']")).click();
		};
	};


	module.exports = OauthPageObject;

})();
