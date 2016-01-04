(function() {
	"use strict";

	var navbar, NavbarObject;

	NavbarObject = require(process.cwd() + "/e2e/suites/navbar/navbar-page-object.js");


	beforeEach(function() {
		navbar = new NavbarObject();
		navbar.get();
	});


	describe("The navbar", function() {
		describe("title", function() {
			it("exists", function() {
				expect(navbar.hasTitle()).toEqual(true);
			});

			it("equals 'KANBAN 看板'", function() {
				expect(navbar.getTitle()).toEqual("KANBAN 看板");
			});
		});


		describe("dropdown menu", function() {
			it("exists", function() {
				expect(navbar.hasDropdownMenu()).toEqual(true);
			});

			it("has 3 links", function() {
				expect(navbar.getDropdownLinksCount()).toEqual(3);
			});

			it("link 'Login' redirects to #/kanban/myidentity", function() {
				expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/app/#/kanban/identity");
				navbar.clickDropdown();
				expect(navbar.getLinkName(0)).toEqual("Login");
				navbar.clickLink(0);
				expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/app/#/kanban/identity");
			});

			it("link 'My Boards' redirects to #/kanban/user without prior login", function() {
				expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/app/#/kanban/identity");
				browser.executeScript('window.sessionStorage.clear();');
				navbar.clickDropdown();
				expect(navbar.getLinkName(1)).toEqual("Visit Boards");
				navbar.clickLink(1);
				expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/app/#/kanban/identity");
			});

			it("link 'My Boards' redirects to #/kanban/user/sheldon after login", function() {
				expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/app/#/kanban/identity");

				//get token from server
				$("button[ng-click='authenticate()']").click();

				navbar.clickDropdown();
				expect(navbar.getLinkName(1)).toEqual("Visit Boards");
				navbar.clickLink(1);
				expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/app/#/kanban/user/sheldon");
			});

			it("link 'About' redirects to #/kanban/about", function() {
				expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/app/#/kanban/identity");
				navbar.clickDropdown();
				expect(navbar.getLinkName(2)).toEqual("About");
				navbar.clickLink(2);
				expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/app/#/kanban/about");
			});
		});
	});
})();
