(function() {
	"use strict";

	describe("Footer", function() {

		var footer, FooterObject;

		FooterObject = function() {
			var footer = $(".footer-view");
			var footerAnchor = footer.element(by.css("a"));

			this.get = function() {
				browser.get("http://localhost:3000/app/#/kanban/identity");
			};

			this.getFooterText = function() {
				return footer.getText();
			};

			this.isPresent = function() {
				return footer.isPresent();
			};

			this.getFooter = function() {
				return footer;
			};

			this.anchorIsPresent = function() {
				return footerAnchor.isPresent();
			};

			this.getAnchorLink = function() {
				return footerAnchor.getAttribute("href");
			};
		};

		beforeEach(function() {
			footer = new FooterObject();
			footer.get();
		});

		it("is present", function() {
			expect(footer.isPresent()).toEqual(true);
		});

		it("features the author's name", function() {
			expect(footer.getFooterText()).toContain("Daniel Leaver");
		});

		it("features a link", function() {
			expect(footer.anchorIsPresent()).toEqual(true);
		});

		it("features a link to the author's github account", function() {
			expect(footer.getAnchorLink()).toEqual("https://github.com/AzuObs/kanban");
		});
	});

})();
