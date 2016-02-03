(function() {
	"use strict";

	var pageObject, NavbarObject;

	NavbarObject = require(process.cwd() + "/e2e/suites/navbar/navbar-page-object.js");
	pageObject = new NavbarObject();


	describe("The navbar", function() {
		beforeEach(function() {
			pageObject.get();
		});

		describe("title", function() {
			it("exists", function() {
				expect(pageObject.hasTitle()).toEqual(true);
			});

			it("equals 'KANBAN 看板'", function() {
				expect(pageObject.getTitle()).toEqual("KANBAN 看板");
			});
		});


		describe("menu", function() {
			it("exists", function() {
				expect(pageObject.hasMenu()).toEqual(true);
			});

			it("has 3 links", function() {
				expect(pageObject.getMenuLinksCount()).toEqual(3);
			});

			it("retracts", function() {
				expect(pageObject.getMenuLinksCount()).toEqual(3);
				pageObject.clickExpandMenuToggle();
				expect(pageObject.getMenuLinksCount()).toEqual(0);
			});

			it("expands", function() {

			});

			it("link 'Boards' redirects to #/kanban/user without prior login", function() {
				expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/src/#/kanban/identity");
				browser.executeScript('window.sessionStorage.clear();');
				expect(pageObject.getLinkName(0)).toEqual("Boards");
				pageObject.clickLink(0);
				expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/src/#/kanban/error");
				expect($(".error-page-body h3").getText()).toContain("401");
			});

			it("link 'My Boards' redirects to #/kanban/user/sheldon after login", function() {
				expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/src/#/kanban/identity");

				//get token from server
				$("button[ng-click='authenticate()']").click();

				expect(pageObject.getLinkName(0)).toEqual("Boards");
				pageObject.clickLink(0);
				expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/src/#/kanban/user/sheldon");
			});

			it("link 'Login' redirects to #/kanban/myidentity", function() {
				expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/src/#/kanban/identity");
				expect(pageObject.getLinkName(2)).toEqual("Login");
				pageObject.clickLink(2);
				expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/src/#/kanban/identity");
			});

			it("link 'About' redirects to #/kanban/about", function() {
				expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/src/#/kanban/identity");
				expect(pageObject.getLinkName(1)).toEqual("About");
				pageObject.clickLink(1);
				expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/src/#/kanban/about");
			});
		});
	});
})();
