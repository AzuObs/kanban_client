(function() {
	"use strict";

	var pageObject, NavbarObject;

	NavbarObject = require(process.cwd() + "/e2e/suites/navbar/navbar-page-object.js");
	pageObject = new NavbarObject();


	beforeEach(function() {
		pageObject.get();
	});


	describe("The navbar", function() {
		describe("title", function() {
			it("exists", function() {
				expect(pageObject.hasTitle()).toEqual(true);
			});

			it("equals 'KANBAN 看板'", function() {
				expect(pageObject.getTitle()).toEqual("KANBAN 看板");
			});
		});


		describe("dropdown menu", function() {
			it("exists", function() {
				expect(pageObject.hasDropdownMenu()).toEqual(true);
			});

			it("has 3 links", function() {
				expect(pageObject.getDropdownLinksCount()).toEqual(3);
			});

			it("link 'Login' redirects to #/kanban/myidentity", function() {
				expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/app/#/kanban/identity");
				pageObject.clickDropdown();
				expect(pageObject.getLinkName(0)).toEqual("Login");
				pageObject.clickLink(0);
				expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/app/#/kanban/identity");
			});

			it("link 'My Boards' redirects to #/kanban/user without prior login", function() {
				expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/app/#/kanban/identity");
				browser.executeScript('window.sessionStorage.clear();');
				pageObject.clickDropdown();
				expect(pageObject.getLinkName(1)).toEqual("Visit Boards");
				pageObject.clickLink(1);
				expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/app/#/kanban/identity");
			});

			it("link 'My Boards' redirects to #/kanban/user/sheldon after login", function() {
				expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/app/#/kanban/identity");

				//get token from server
				$("button[ng-click='authenticate()']").click();

				pageObject.clickDropdown();
				expect(pageObject.getLinkName(1)).toEqual("Visit Boards");
				pageObject.clickLink(1);
				expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/app/#/kanban/user/sheldon");
			});

			it("link 'About' redirects to #/kanban/about", function() {
				expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/app/#/kanban/identity");
				pageObject.clickDropdown();
				expect(pageObject.getLinkName(2)).toEqual("About");
				pageObject.clickLink(2);
				expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/app/#/kanban/about");
			});
		});
	});
})();
