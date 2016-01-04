(function() {

	var oauthPage, OauthPageObject;

	OauthPageObject = function() {
		var oauthPage = $(".oauth-container");

		this.get = function() {
			browser.get("http://localhost:3000/app/#/kanban/identity");
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
