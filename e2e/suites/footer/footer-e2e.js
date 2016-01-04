(function() {
	"use strict";

	describe("Footer", function() {

		var footer, FooterObject;
		FooterObject = require(process.cwd() + "/e2e/suites/footer/footer-page-object.js");

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
