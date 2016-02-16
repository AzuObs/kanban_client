(function() {
	"use strict";

	var OauthPageObject = function() {
		var oauthPage = $(".oauth-container");

		this.get = function() {
			browser.get("http://localhost:3000/src/#/identity");
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
			return $("form[name='loginForm']").isPresent();
		};

		this.hasDemoCredentials = function() {
			return oauthPage.element(by.className("login-help-credentials")).isPresent();
		};

		this.getUsername = function() {
			return element(by.model("loginUsername")).evaluate("loginUsername");
		};

		this.getPwd = function() {
			return element(by.model("loginPwd")).evaluate("loginPwd");
		};

		this.clickLogin = function() {
			return  $("form[name='loginForm'] button").click();
		};
	};


	module.exports = OauthPageObject;

})();
