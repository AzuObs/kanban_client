(function() {
	"use strict";

	var boardModalPO, BoardModalPageObject;

	BoardModalPageObject = require(process.cwd() + "/e2e/suites/board-modal/board-modal-page-object.js");
	boardModalPO = new BoardModalPageObject();

	describe("The board modal", function() {
		boardModalPO.get();

		it("is present after clicking on a board in the boardlist screen", function() {

		});

		it("has a title", function() {

		});

		it("has board options", function() {

		});

		it("title can be edited by being clicked", function() {

		});

		it("titles stops being edited after a click happens outside of the title", function() {

		});

		it("title can be edited by clicking on 'edit board name' option", function() {

		});

		it("title stops being edited after the 'edit board name' is reclicked", function() {

		});

		it("has a delete option", function() {

		});

		it("prompts the user to input the board name to confirm deletion", function() {

		});

		it("exists the modal and deletes the board after deletion confirmation", function() {

		});
	});

	module.exports = exports;
})();
