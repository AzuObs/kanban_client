(function() {
	"use strict";

	var boardModalPO, BoardModalPageObject;

	BoardModalPageObject = require(process.cwd() + "/e2e/suites/board-modal/board-modal-page-object.js");
	boardModalPO = new BoardModalPageObject();


	describe("The board modal", function() {

		it("is present after clicking on a board in the boardlist screen", function() {
			boardModalPO.get();
			expect(boardModalPO.boardsContain("foobar")).toEqual(true);
			boardModalPO.clickEditBoard("foobar");
			expect(boardModalPO.modalIsPresent()).toEqual(true);
		});

		it("has a close button", function() {
			expect(boardModalPO.hasCloseButton()).toEqual(true);
		});

		it("closes the modal when the close button is clicked", function() {
			boardModalPO.clickCloseButton();
			expect(boardModalPO.modalIsPresent()).toEqual(false);
			boardModalPO.clickEditBoard("foobar");
			expect(boardModalPO.modalIsPresent()).toEqual(true);
		});

		it("has a title", function() {
			expect(boardModalPO.modalHasTitle()).toEqual(true);
		});

		it("has board options", function() {
			expect(boardModalPO.modalHasBoardOptions()).toEqual(true);
		});

		it("title can be edited by being clicked", function() {
			boardModalPO.clickTitle();
			expect(boardModalPO.titleIsEditable()).toEqual(true);
		});

		it("titles stops being edited after a click happens outside of the title", function() {
			boardModalPO.clickOutsideOfTitle();
			expect(boardModalPO.titleIsEditable()).toEqual(false);
		});

		it("title can be edited by clicking on 'edit board name' option", function() {
			boardModalPO.clickEditBoardOption();
			expect(boardModalPO.titleIsEditable()).toEqual(true);
		});

		it("title takes input and saves it", function() {
			expect(boardModalPO.getTitleValue()).toEqual("foobar");
			boardModalPO.clearTitleValue();
			boardModalPO.setTitleValue("foo");
			boardModalPO.clickOutsideOfTitle();
			browser.waitForAngular();
			expect(boardModalPO.getTitleValue()).toEqual("foo");
		});

		it("has a delete option", function() {
			expect(boardModalPO.hasDeleteOption()).toEqual(true);
		});

		it("prompts the user to input the board name to confirm deletion", function() {
			boardModalPO.clickDeleteButton();
			expect(boardModalPO.hasDeletionConfirmationInput()).toEqual(true);
		});

		it("exists the modal and deletes the board after deletion confirmation", function() {
			boardModalPO.confirmDeletion("foo");
			expect(boardModalPO.modalIsPresent()).toEqual(false);
			expect(boardModalPO.boardsContain("foo")).toEqual(false);
		});
	});

	module.exports = exports;
})();
