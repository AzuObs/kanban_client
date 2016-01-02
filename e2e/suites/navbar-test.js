(function() {
	"use strict";

	var navbar = function() {
		// var title = element(by.)
	};


	describe("Navbar Object", function() {

		it("should have a title", function() {
			browser.get("http://localhost:3000/app/#/kanban/identity");

			expect(browser.getTitle()).toContain("ban");
		});
	});
})();
