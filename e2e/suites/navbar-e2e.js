(function() {
	"use strict";

	var navbar, NavbarObject;


	// 
	// PAGE OBJECT
	// 

	NavbarObject = function() {
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


	// 	
	// TEST
	// 

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
