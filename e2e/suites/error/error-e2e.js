(function() {
	"use strict";

	var PageObject, pageObject;
	PageObject = require(process.cwd() + "/e2e/suites/error/error-page-object.js");
	pageObject = new PageObject();


	describe("error page", function() {
		beforeEach(function() {
			pageObject.init();
		});

		it("is present", function() {
			expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/src/#/error");
			expect(pageObject.isPresent()).toEqual(true);
		});

		it("has an img", function() {
			expect(pageObject.imgIsPresent()).toEqual(true);
		});

		it("has a body", function() {
			expect(pageObject.bodyIsPresent()).toEqual(true);
		});


		describe("default", function() {
			it("title is 404 - Not Found", function() {
				expect(pageObject.getTitle()).toEqual("404 - Not Found");
			});

			it("redirect link says GO TO LOGIN", function() {
				expect(pageObject.getRedirectLink()).toEqual("GO TO LOGIN");
			});

			it("reidrect link send to kanban/identity", function() {
				expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/src/#/error");
				pageObject.clickRedirectLink();
				expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/src/#/identity");
			});
		});


		describe("after a routing error in the app", function() {
			beforeEach(function() {
				browser.get("http://localhost:3000/src/#/kanb");
			});

			it("the error page is present", function() {
				expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/src/#/error");
				expect(pageObject.isPresent()).toEqual(true);
			});

			it("title is 404 - Not Found", function() {
				expect(pageObject.getTitle()).toEqual("404 - Not Found");
			});

			it("redirect link says GO TO LOGIN", function() {
				expect(pageObject.getRedirectLink()).toEqual("GO TO LOGIN");
			});

			it("reidrect link send to kanban/identity", function() {
				expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/src/#/error");
				pageObject.clickRedirectLink();
				expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/src/#/identity");
			});
		});


		describe("after an unauthorized access", function() {
			beforeEach(function() {
				browser.get("http://localhost:3000/src/#/user/");
			});

			it("the error page is present", function() {
				expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/src/#/error");
				expect(pageObject.isPresent()).toEqual(true);
			});

			it("title is 401 - Unauthorized Access", function() {
				expect(pageObject.getTitle()).toEqual("401 - Unauthorized Access");
			});

			it("redirect link says GO TO LOGIN", function() {
				expect(pageObject.getRedirectLink()).toEqual("GO TO LOGIN");
			});

			it("reidrect link send to kanban/identity", function() {
				expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/src/#/error");
				pageObject.clickRedirectLink();
				expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/src/#/identity");
			});
		});
	});
})();
