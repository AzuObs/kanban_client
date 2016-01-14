(function() {
	"use strict";

	var pageObject, UserModalPageObject;

	UserModalPageObject = require(process.cwd() + "/e2e/suites/user-modal/user-modal-page-object.js");
	pageObject = new UserModalPageObject();

	describe("The user modal", function() {
		it("the test initializes", function() {
			pageObject.initTest();
			expect(pageObject.boardIsPresent()).toEqual(true);
			expect(pageObject.getUserCount()).toEqual(2);
		});

		it("is present after clicking a user from the user-selection section in the board", function() {
			pageObject.clickUser("raj");
			expect(pageObject.userModalIsPresent()).toEqual(true);
		});

		it("close button will close the modal when clicked", function() {
			pageObject.clickCloseModal();
			expect(pageObject.userModalIsPresent()).toEqual(false);
			pageObject.clickUser("raj");
			expect(pageObject.userModalIsPresent()).toEqual(true);
		});

		it("title is present", function() {
			expect(pageObject.titleIsPresent()).toEqual(true);
		});

		it("has a picture of the user", function() {
			expect(pageObject.userImgIsPresent()).toEqual(true);
		});

		describe("change priviledge button", function() {
			it("will open a configuration menu", function() {
				pageObject.clickChangePriviledgeButton();
				expect(pageObject.getCheckboxCount()).toEqual(2);
			});

			it("can change the user's priviledges", function() {
				expect(pageObject.isCheckboxChecked("Admin")).toEqual(false);
				expect(pageObject.isCheckboxChecked("Member")).toEqual(true);

				pageObject.checkCheckbox("Admin");

				expect(pageObject.isCheckboxChecked("Admin")).toEqual(true);
				expect(pageObject.isCheckboxChecked("Member")).toEqual(false);

				pageObject.checkCheckbox("Member");
			});

			it("will ask for confirmation", function() {
				//feature under development
			});
		});

		describe("remove user button", function() {
			it("will open a confirmation menu", function() {
				expect(pageObject.removeUserButtonIsPresent()).toEqual(true);
				expect(pageObject.removeUserConfirmationIsPresent()).toEqual(false);

				pageObject.clickRemoveUserButton();

				expect(pageObject.removeUserConfirmationIsPresent()).toEqual(true);
			});

			it("will remove user after confirmation", function() {
				expect(pageObject.getUserCount()).toEqual(2);
				pageObject.typeRemoveUserConfirmation("raj");
				expect(pageObject.getUserCount()).toEqual(1);
				expect(pageObject.userModalIsPresent()).toEqual(false);
			});

			it("will not remove an admin", function() {
				pageObject.clickUser("sheldon");
				expect(pageObject.userModalIsPresent()).toEqual(true);

				pageObject.clickRemoveUserButton();
				expect(pageObject.removeUserConfirmationIsPresent()).toEqual(false);
			});
		});

		it("the test cleans up and exits", function() {
			pageObject.clickCloseModal();
			pageObject.cleanUpAndExit();
		});
	});
})();
