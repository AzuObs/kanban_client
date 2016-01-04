(function() {

	var oauthPage, OauthPageObject;

	OauthPageObject = require(process.cwd() + "/e2e/suites/oauth/oauth-page-object.js");

	describe("The oauth page", function() {
		beforeEach(function() {
			oauthPage = new OauthPageObject();
			oauthPage.get();
		});

		it("is present", function() {
			expect(oauthPage.isPresent()).toEqual(true);
		});

		it("has a fancy scrollbar", function() {
			expect(oauthPage.hasFancyScrollbar()).toEqual(true);
		});

		it("has a login section", function() {
			expect(oauthPage.hasLoginSection()).toEqual(true);
		});

		it("login shows demo credentials", function() {
			expect(oauthPage.hasDemoCredentials()).toEqual(true);
		});

		it("login has placeholder credentials", function() {
			expect(oauthPage.hasPlaceholderUsername()).toEqual(true);
			expect(oauthPage.hasPlaceholderPwd()).toEqual(true);
		});

		it("sends the user to 'kanban/user/:username' on successful login", function() {
			expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/app/#/kanban/identity");
			oauthPage.clickLogin();
			expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/app/#/kanban/user/sheldon");
		});
	});
})();
